import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { UserRepository } from './repositories/users-repository';
import { PrismaUserRepository } from './repositories/prisma/prisma-users-repository';

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
export class AppModule {}
