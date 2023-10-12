import { Test, TestingModule } from '@nestjs/testing';
import { TravelController } from '../../../travel/controller/travel.controller';
import { TravelServiceImpl } from '../../../travel/services/travel-service-impl.service';
import { UsersModule } from '../../../users/users.module';
import { PrismaService } from '../../../database/prisma.service';
import { TravelRepository } from '../../../travel/repositories/travels-repository';
import { PrismaTravelRepository } from '../../../travel/repositories/prisma/prisma-travels-repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../../auth/constants/token';
import { CreateTravelDto } from 'src/travel/dto/create-travel.dto';
import { createResponse } from 'node-mocks-http';
import { HttpStatus } from '@nestjs/common';

describe('TravelController', () => {
  let travelController: TravelController;
  let travelServiceImpl: TravelServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({ secret: jwtConstants.secret }),
      ],
      controllers: [TravelController],
      providers: [
        TravelServiceImpl,
        PrismaService,
        { provide: TravelRepository, useClass: PrismaTravelRepository },
      ],
    }).compile();
    travelController = module.get<TravelController>(TravelController);
    travelServiceImpl = module.get<TravelServiceImpl>(TravelServiceImpl);
  });

  it('should be defined', () => {
    expect(travelController).toBeDefined();
    expect(travelServiceImpl).toBeDefined();
  });

  it('should create a travel', async () => {
    const createTravelDTO: CreateTravelDto = {
      destination: 'test',
      departure_location: 'test',
      id: '',
      ownerId: '',
      seats: 15,
      value: '150',
      pendents: [],
      confirmeds: [],
    };

    jest.spyOn(travelServiceImpl, 'createTravel').mockResolvedValue();
    const response = createResponse();
    await travelController.createTravel(createTravelDTO, response);

    expect(response._getStatusCode()).toBe(HttpStatus.CREATED);
  });

  it('should handle error when creating a travel', async () => {
    const createTravelDTO: CreateTravelDto = {
      destination: 'test',
      departure_location: 'test',
      id: '',
      ownerId: '',
      seats: 15,
      value: '150',
      pendents: [],
      confirmeds: [],
    };
    jest
      .spyOn(travelServiceImpl, 'createTravel')
      .mockRejectedValue(new Error('Falha ao criar viagem'));

    const response = createResponse();
    const errorMessage = 'Falha ao criar viagem';

    try {
      await travelController.createTravel(createTravelDTO, response);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });

  it('should get all travels', async () => {
    const response = createResponse();
    await travelController.getAllTravels(response);
    expect(response._getStatusCode()).toBe(HttpStatus.OK);
  });

  it('should error when get all travels', async () => {
    jest
      .spyOn(travelServiceImpl, 'getAllTravels')
      .mockRejectedValue(new Error());
    const response = createResponse();
    const errorMessage = 'Falha ao buscar viagens';

    try {
      await travelController.getAllTravels(response);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
