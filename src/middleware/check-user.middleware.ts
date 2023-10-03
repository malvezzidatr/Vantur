import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/users/users.service';

@Injectable()
export class CheckUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const email = req?.body?.email as string;

    const userExists = await this.userService.getUserByEmail(email);

    if (userExists) {
      return res.status(HttpStatus.CONFLICT).json({
        message: 'Email de usuário já cadastrado.',
      });
    }

    next();
  }
}
