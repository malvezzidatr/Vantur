import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserServiceImpl } from '../users/services/users-service-impl.service';

@Injectable()
export class CheckUserByIdMiddleware implements NestMiddleware {
  constructor(private readonly userServiceUserServiceImpl: UserServiceImpl) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const id = req?.body?.id as string;

    const userExists = await this.userServiceUserServiceImpl.getUserById(id);

    if (userExists) {
      return res.status(HttpStatus.CONFLICT).json({
        message: 'Usuário não encontrado',
      });
    }

    next();
  }
}
