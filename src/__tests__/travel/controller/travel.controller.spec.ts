import { Test, TestingModule } from '@nestjs/testing';
import { TravelController } from '../../../travel/controller/travel.controller';
import { TravelServiceImpl } from '../../../travel/services/travel-service-impl.service';
import { UsersModule } from '../../../users/users.module';
import { PrismaService } from '../../../database/prisma.service';
import { TravelRepository } from '../../../travel/repositories/travels-repository';
import { PrismaTravelRepository } from '../../../travel/repositories/prisma/prisma-travels-repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../../auth/constants/token';
import { CreateTravelDTO } from 'src/travel/dto/create-travel.dto';
import { createResponse } from 'node-mocks-http';
import { HttpStatus } from '@nestjs/common';
import { UpdateUserAsConfirmedDTO } from 'src/travel/dto/update-user-as-confirmed.dto';
import { UpdateUserAsPendingDTO } from 'src/travel/dto/update-user-as-pending.dto';

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
    const createTravelDTO: CreateTravelDTO = {
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
    const createTravelDTO: CreateTravelDTO = {
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

  it('should get travel by id', async () => {
    const createTravelDTO: CreateTravelDTO = {
      destination: 'test',
      departure_location: 'test',
      id: '',
      ownerId: '',
      seats: 15,
      value: '150',
      pendents: [],
      confirmeds: [],
    };
    const id = '1';
    const response = createResponse();
    jest
      .spyOn(travelServiceImpl, 'getTravelById')
      .mockResolvedValue(createTravelDTO);
    await travelController.getTravelById(id, response);
    expect(response._getStatusCode()).toBe(HttpStatus.OK);
  });

  it('should handle error when get travel by id', async () => {
    const id = '1';
    const response = createResponse();
    const errorMessage = 'Falha ao encontrar viagem';
    jest
      .spyOn(travelServiceImpl, 'getTravelById')
      .mockRejectedValue(new Error());

    try {
      await travelController.getTravelById(id, response);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });

  it('should update user to pendent', async () => {
    const updateUserAsPendingDTO: UpdateUserAsPendingDTO = {
      travelId: '1',
      userId: '1',
    };
    const response = createResponse();
    jest.spyOn(travelServiceImpl, 'addUserAsPending').mockResolvedValue();
    await travelController.addUserAsPendent(updateUserAsPendingDTO, response);
    expect(response._getStatusCode()).toBe(HttpStatus.NO_CONTENT);
  });

  it('should error when update user to pendent', async () => {
    const updateUserAsPendingDTO: UpdateUserAsPendingDTO = {
      travelId: '1',
      userId: '1',
    };
    const response = createResponse();
    const errorMessage = 'Falha na requisição';
    jest
      .spyOn(travelServiceImpl, 'addUserAsPending')
      .mockRejectedValue(new Error());

    try {
      await travelController.addUserAsPendent(updateUserAsPendingDTO, response);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });

  it('should update user to confirmed', async () => {
    const updateUserAsConfirmedDTO: UpdateUserAsConfirmedDTO = {
      travelId: '1',
      userId: '1',
    };
    const response = createResponse();
    jest.spyOn(travelServiceImpl, 'addUserAsConfirmed').mockResolvedValue();
    await travelController.addUserAsConfirmed(
      updateUserAsConfirmedDTO,
      response,
    );
    expect(response._getStatusCode()).toBe(HttpStatus.NO_CONTENT);
  });

  it('should error when update user to confirmed', async () => {
    const updateUserAsConfirmedDTO: UpdateUserAsConfirmedDTO = {
      travelId: '1',
      userId: '1',
    };
    const response = createResponse();
    const errorMessage = 'Falha na requisição';
    jest
      .spyOn(travelServiceImpl, 'addUserAsConfirmed')
      .mockRejectedValue(new Error());

    try {
      await travelController.addUserAsConfirmed(
        updateUserAsConfirmedDTO,
        response,
      );
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
