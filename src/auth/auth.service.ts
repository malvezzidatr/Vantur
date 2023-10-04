import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { comparePsswd } from 'src/utils/crypto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    const psswdIsEqual = await comparePsswd(password, user?.password);
    if (!psswdIsEqual) {
      throw new UnauthorizedException();
    }
  }
}
