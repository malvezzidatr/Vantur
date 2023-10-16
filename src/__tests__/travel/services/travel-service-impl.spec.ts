import { Test, TestingModule } from '@nestjs/testing';
import { TravelServiceImpl } from '../../../travel/services/travel-service-impl.service';
import { TravelRepository } from '../../../travel/repositories/travels-repository';
import { UsersModule } from '../../../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../../auth/constants/token';
import { TravelController } from '../../../travel/controller/travel.controller';
import { PrismaService } from '../../../database/prisma.service';
import { CreateTravelDTO } from 'src/travel/dto/create-travel.dto';
import { UpdateUserAsPendingDTO } from 'src/travel/dto/update-user-as-pending.dto';
import { UpdateUserAsConfirmedDTO } from 'src/travel/dto/update-user-as-confirmed.dto';

class TravelRepositoryMock {
  createTravel() {}
  updateUserToPendent() {}
  updateUserToConfirmed() {}
  getAllTravels() {}
  getTravelById() {}
}

describe('TravelServiceImpl', () => {
  let travelService: TravelServiceImpl;
  let travelRepository: TravelRepository;
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
  const updateUser: UpdateUserAsPendingDTO | UpdateUserAsConfirmedDTO = {
    travelId: '1',
    userId: '1',
  };

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
        { provide: TravelRepository, useClass: TravelRepositoryMock },
      ],
    }).compile();

    travelService = module.get<TravelServiceImpl>(TravelServiceImpl);
    travelRepository = module.get<TravelRepository>(TravelRepository);
  });

  it('should be defined', () => {
    expect(travelService).toBeDefined();
  });

  it('should create a travel', async () => {
    const createTravelSpy = jest
      .spyOn(travelRepository, 'createTravel')
      .mockResolvedValue();

    await travelService.createTravel(createTravelDTO);

    expect(createTravelSpy).toHaveBeenCalledWith(createTravelDTO);
  });

  it('should throw an error when createTravel fails', async () => {
    const errorMessage = 'Falha ao criar viagem';
    jest
      .spyOn(travelRepository, 'createTravel')
      .mockRejectedValue(new Error(errorMessage));

    try {
      await travelService.createTravel(createTravelDTO);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });

  it('should get all travels', async () => {
    const createTravelDTO: CreateTravelDTO[] = [
      {
        destination: 'test',
        departure_location: 'test',
        id: '',
        ownerId: '',
        seats: 15,
        value: '150',
        pendents: [],
        confirmeds: [],
      },
    ];

    jest
      .spyOn(travelRepository, 'getAllTravels')
      .mockResolvedValue(createTravelDTO);

    const result = await travelService.getAllTravels();
    expect(result).toBe(createTravelDTO);
  });

  it('should throw an error when get all travels fails', async () => {
    const createTravelDTO: CreateTravelDTO[] = [
      {
        destination: 'test',
        departure_location: 'test',
        id: '',
        ownerId: '',
        seats: 15,
        value: '150',
        pendents: [],
        confirmeds: [],
      },
    ];
    const errorMessage = 'Falha ao buscar viagens';
    jest
      .spyOn(travelRepository, 'getAllTravels')
      .mockRejectedValue(createTravelDTO);

    try {
      await travelService.getAllTravels();
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });

  it('should get travel by id', async () => {
    const id = '1';
    jest
      .spyOn(travelRepository, 'getTravelById')
      .mockResolvedValue(createTravelDTO);

    const result = await travelService.getTravelById(id);
    expect(result).toBe(createTravelDTO);
  });

  it('should throw an error when get travel by id fails', async () => {
    const id = '1';
    const errorMessage = 'Falha ao encontrar viagem';
    jest
      .spyOn(travelRepository, 'getTravelById')
      .mockRejectedValue(new Error(errorMessage));

    try {
      await travelService.getTravelById(id);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });

  it('should add person to pendent', async () => {
    const updateUserSpy = jest
      .spyOn(travelRepository, 'updateUserToPendent')
      .mockResolvedValue(updateUser);

    await travelService.addUserAsPending(updateUser);
    expect(updateUserSpy).toHaveBeenCalledWith(updateUser);
  });

  it('should throw an error when add person to pendent fails', async () => {
    const errorMessage = 'Falha na requisição';
    jest
      .spyOn(travelRepository, 'updateUserToPendent')
      .mockRejectedValue(updateUser);

    try {
      await travelService.addUserAsPending(updateUser);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });

  it('should add person to confirmed', async () => {
    const updateUserSpy = jest
      .spyOn(travelRepository, 'updateUserToConfirmed')
      .mockResolvedValue(updateUser);

    await travelService.addUserAsConfirmed(updateUser);
    expect(updateUserSpy).toHaveBeenCalledWith(updateUser);
  });

  it('should throw an error when add person to confirmed fails', async () => {
    const errorMessage = 'Falha na requisição';
    jest
      .spyOn(travelRepository, 'updateUserToConfirmed')
      .mockRejectedValue(updateUser);

    try {
      await travelService.addUserAsConfirmed(updateUser);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
