import { Test, TestingModule } from '@nestjs/testing';
import { TravelController } from '../../../travel/controller/travel.controller';
import { TravelService } from '../../../travel/services/travel.service';
import { UsersModule } from '../../../users/users.module';
import { PrismaService } from '../../../database/prisma.service';
import { TravelRepository } from '../../../travel/repositories/travels-repository';
import { PrismaTravelRepository } from '../../../travel/repositories/prisma/prisma-travels-repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../../auth/constants/token';

describe('TravelController', () => {
  let travelController: TravelController;
  let travelService: TravelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({ secret: jwtConstants.secret }),
      ],
      controllers: [TravelController],
      providers: [
        TravelService,
        PrismaService,
        { provide: TravelRepository, useClass: PrismaTravelRepository },
      ],
    }).compile();
    travelController = module.get<TravelController>(TravelController);
    travelService = module.get<TravelService>(TravelService);
  });

  it('should be defined', () => {
    expect(travelController).toBeDefined();
    expect(travelService).toBeDefined();
  });
});
