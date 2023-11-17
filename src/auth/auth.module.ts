import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthServiceImpl } from './services/auth-service-impl.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthServiceImpl],
  exports: [AuthServiceImpl],
})
export class AuthModule {}
