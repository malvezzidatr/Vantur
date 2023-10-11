import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { TravelServiceImpl } from './services/travel-service-impl.service';
import { TravelController } from './controller/travel.controller';
import { PrismaService } from '../database/prisma.service';
import { TravelRepository } from './repositories/travels-repository';
import { PrismaTravelRepository } from './repositories/prisma/prisma-travels-repository';
import { UsersModule } from '../users/users.module';
import { CheckUserByIdMiddleware } from 'src/middleware/check-user-by-id.middleware';

@Module({
  imports: [UsersModule],
  controllers: [TravelController],
  providers: [
    TravelServiceImpl,
    PrismaService,
    { provide: TravelRepository, useClass: PrismaTravelRepository },
  ],
})
export class TravelModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(CheckUserByIdMiddleware)
  //     .forRoutes({ path: 'travel/pendent', method: RequestMethod.PATCH });
  // }
}
