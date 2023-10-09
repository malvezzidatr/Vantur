import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { PrismaService } from '../database/prisma.service';
import { TravelRepository } from './repositories/travels-repository';
import { PrismaTravelRepository } from './repositories/prisma/prisma-travels-repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [TravelController],
  providers: [
    TravelService,
    PrismaService,
    { provide: TravelRepository, useClass: PrismaTravelRepository },
  ],
})
export class TravelModule {}
