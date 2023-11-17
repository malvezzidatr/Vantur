import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserServiceImpl } from '../../users/services/users-service-impl.service';
import { comparePsswd } from '../../utils/crypto';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth-service';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly userServiceImUserServiceImpl: UserServiceImpl,
    private readonly jwtService: JwtService,
  ) {}

  public generateTokens(user: any) {
    const userData = {
      id: user?.id,
      first_name: user?.first_name,
      last_name: user?.last_name,
    };

    const accessToken = this.jwtService.sign(userData);

    return { accessToken };
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userServiceImUserServiceImpl.getUserByEmail(email);

    if (!user || !user?.password) {
      throw new UnauthorizedException({
        message: 'Usuário ou senha inválidos',
      });
    }

    const psswdIsValid = await comparePsswd(password, user?.password);
    if (!psswdIsValid) {
      throw new UnauthorizedException({
        message: 'Usuário ou senha inválidos',
      });
    }

    const { accessToken } = this.generateTokens(user);

    return {
      access_token: accessToken,
      userData: {
        id: user?.id,
        first_name: user?.first_name,
        last_name: user?.last_name,
      },
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const decodedRefreshToken = this.jwtService.verify(refreshToken) as {
        id: string;
      };

      const user = await this.userServiceImUserServiceImpl.getUserById(
        decodedRefreshToken.id,
      );

      if (!user) {
        throw new UnauthorizedException({
          message: 'Usuário não encontrado',
        });
      }

      const newAccessToken = this.jwtService.sign({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
      });

      return {
        access_token: newAccessToken,
        userData: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      };
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Token de atualização inválido ou expirado',
      });
    }
  }
}
