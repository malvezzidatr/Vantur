import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthServiceImpl } from './services/auth-service-impl.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { CheckToken } from 'src/middleware/check-token.middleware';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '500s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthServiceImpl],
  exports: [AuthServiceImpl],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckToken)
      .exclude({
        path: '/auth/login',
        method: RequestMethod.POST,
      })
      .forRoutes('*');
  }
}
