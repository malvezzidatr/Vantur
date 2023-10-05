import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TravelModule } from './travel/travel.module';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot(), TravelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
