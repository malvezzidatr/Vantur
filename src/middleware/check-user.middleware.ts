import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserServiceImpl } from 'src/users/services/users-service-impl.service';

@Injectable()
export class CheckUserMiddleware implements NestMiddleware {
  constructor(private readonly userServiceUserServiceImpl: UserServiceImpl) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const email = req?.body?.email as string;

    const userExists = await this.userServiceUserServiceImpl.getUserByEmail(email);

    if (userExists) {
      return res.status(HttpStatus.CONFLICT).json({
        message: 'Email de usuário já cadastrado.',
      });
    }

    next();
  }
}
