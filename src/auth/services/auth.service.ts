import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserServiceImpl } from '../../users/services/users-service-impl.service';
import { comparePsswd } from '../../utils/crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServiceImUserServiceImpl: UserServiceImpl,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userServiceImUserServiceImpl.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const psswdIsEqual = await comparePsswd(password, user?.password);
    if (!psswdIsEqual) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user?.id,
      first_name: user?.first_name,
      last_name: user?.last_name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
