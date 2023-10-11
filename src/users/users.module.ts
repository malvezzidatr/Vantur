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
import { CheckUserMiddleware } from '../middleware/check-user-by-email.middleware';
import { UserController } from './controller/users.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants/token';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '500s' },
    }),
  ],
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
