import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { comparePsswd } from 'src/utils/crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const psswdIsEqual = await comparePsswd(password, user?.password);
    if (!psswdIsEqual) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
