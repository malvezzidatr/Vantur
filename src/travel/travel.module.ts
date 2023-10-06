import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { PrismaService } from 'src/database/prisma.service';
import { TravelRepository } from './repositories/travels-repository';
import { PrismaTravelRepository } from './repositories/prisma/prisma-travels-repository';

@Module({
  controllers: [TravelController],
  providers: [
    TravelService,
    PrismaService,
    { provide: TravelRepository, useClass: PrismaTravelRepository },
  ],
})
export class TravelModule {}
