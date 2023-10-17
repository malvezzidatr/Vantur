import { AuthGuard } from '../../auth/auth.guard';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../auth/constants/token';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({}); // Substitua com as opções do JwtService, se necessário
    authGuard = new AuthGuard(jwtService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should return true when a valid token is provided', async () => {
    const payload = {
      sub: 'user_id_here',
      first_name: 'John',
      last_name: 'Doe',
    };
    const token = await jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
      }),
    };

    const canActivateResult = await authGuard.canActivate(context as any);
    expect(canActivateResult).toBe(true);
  });

  it('should throw UnauthorizedException when no token is provided', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    };

    await expect(authGuard.canActivate(context as any)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException when an invalid token is provided', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer token`,
          },
        }),
      }),
    };

    jwtService.verifyAsync = jest
      .fn()
      .mockRejectedValue(new Error('Invalid token'));

    await expect(authGuard.canActivate(context as any)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
