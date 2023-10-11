import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthServiceImpl } from './services/auth-service-impl.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/token';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '500s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthServiceImpl],
  exports: [AuthServiceImpl],
})
export class AuthModule {}
