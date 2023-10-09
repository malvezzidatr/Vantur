import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserServiceImpl } from './services/users-service-impl.service';
import { PrismaService } from '../database/prisma.service';
import { UserRepository } from './repositories/users-repository';
import { PrismaUserRepository } from './repositories/prisma/prisma-users-repository';
import { CheckUserMiddleware } from '../middleware/check-user.middleware';
import { UserController } from './users.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserServiceImpl,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserServiceImpl],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckUserMiddleware)
      .forRoutes({ path: 'user/create', method: RequestMethod.POST });
  }
}
