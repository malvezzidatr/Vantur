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

  private decodeToken(token: string) {
    try {
      const decoded = this.jwtService.decode(token, { json: true }) as {
        exp: number;
      };
      return decoded.exp;
    } catch (error) {
      console.error('Erro ao decodificar o token: ', error.message);
      return null;
    }
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

    const userData = {
      id: user?.id,
      first_name: user?.first_name,
      last_name: user?.last_name,
    };

    const token = await this.jwtService.signAsync(userData);

    return {
      access_token: token,
      userData,
      exp: this.decodeToken(token),
    };
  }
}
