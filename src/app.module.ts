import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { UserService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { UserRepository } from './repositories/users-repository';
import { PrismaUserRepository } from './repositories/prisma/prisma-users-repository';
import { CheckUserMiddleware } from './middleware/check-user.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    UserService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckUserMiddleware)
      .forRoutes({ path: 'user/create', method: RequestMethod.POST });
  }
}
