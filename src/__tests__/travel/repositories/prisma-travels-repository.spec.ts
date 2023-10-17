import { PrismaTravelRepository } from '../../../travel/repositories/prisma/prisma-travels-repository';
import { PrismaService } from '../../../database/prisma.service';
import { CreateTravelDTO } from '../../../travel/dto/create-travel.dto';
import { UpdateUserAsPendingDTO } from 'src/travel/dto/update-user-as-pending.dto';
import { UpdateUserAsConfirmedDTO } from 'src/travel/dto/update-user-as-confirmed.dto';

describe('PrismaTravelRepository', () => {
  let travelRepository: PrismaTravelRepository;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService(); // Substitua por uma instância de serviço Prisma mock ou real
    travelRepository = new PrismaTravelRepository(prismaService);
  });

  it('should get all travels', async () => {
    const travelMock: CreateTravelDTO = {
      id: '1',
      departure_location: 'São Paulo',
      confirmeds: [],
      destination: 'Guarujá',
      ownerId: '1',
      pendents: [],
      seats: 15,
      value: '150',
    };
    prismaService.travel.findMany = jest.fn().mockResolvedValue([travelMock]);

    const travels = await travelRepository.getAllTravels();

    expect(prismaService.travel.findMany).toHaveBeenCalledWith({
      select: {
        id: true,
        departure_location: true,
        destination: true,
        value: true,
        seats: true,
        confirmeds: {
          select: {
            id: true,
          },
        },
        owner: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    expect(travels).toEqual([travelMock]);
  });

  it('should handle getAllTravels errors', async () => {
    prismaService.travel.findMany = jest
      .fn()
      .mockRejectedValue(new Error('Mocked error'));

    await expect(travelRepository.getAllTravels()).rejects.toThrowError(
      'Falha ao buscar viagens',
    );
  });

  it('should create a travel', async () => {
    const createTravelDTO: CreateTravelDTO = {
      departure_location: 'Location A',
      destination: 'Location B',
      seats: 10,
      value: '100',
      ownerId: 'owner_id_here',
      id: '',
      confirmeds: [],
      pendents: [],
    };

    prismaService.travel.create = jest.fn().mockResolvedValue({});

    await travelRepository.createTravel(createTravelDTO);

    expect(prismaService.travel.create).toHaveBeenCalledWith({
      data: {
        departure_location: 'Location A',
        destination: 'Location B',
        id: expect.any(String),
        seats: 10,
        value: '100',
        owner: {
          connect: {
            id: 'owner_id_here',
          },
        },
      },
    });
  });

  it('should handle createTravel errors', async () => {
    const createTravelDTO: CreateTravelDTO = {
      departure_location: 'Location A',
      destination: 'Location B',
      seats: 10,
      value: '100',
      ownerId: 'owner_id_here',
      id: '1',
      confirmeds: [],
      pendents: [],
    };

    prismaService.travel.create = jest
      .fn()
      .mockRejectedValue(new Error('Mocked error'));

    await expect(
      travelRepository.createTravel(createTravelDTO),
    ).rejects.toThrowError('Falha ao criar viagem');
  });

  it('should get a travel by ID', async () => {
    const createTravelDTO: CreateTravelDTO = {
      departure_location: 'Location A',
      destination: 'Location B',
      seats: 10,
      value: '100',
      ownerId: 'owner_id_here',
      id: '',
      confirmeds: [],
      pendents: [],
    };
    const travelId = '1';

    prismaService.travel.findUnique = jest
      .fn()
      .mockResolvedValue(createTravelDTO);

    const travel = await travelRepository.getTravelById(travelId);

    expect(prismaService.travel.findUnique).toHaveBeenCalledWith({
      where: {
        id: travelId,
      },
      select: {
        id: true,
        departure_location: true,
        destination: true,
        seats: true,
        value: true,
        owner: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        confirmeds: {
          select: {
            user: true,
          },
        },
        pendents: {
          select: {
            user: true,
          },
        },
      },
    });

    expect(travel).toEqual(createTravelDTO);
  });

  it('should handle getTravelById errors', async () => {
    const travelId = 'travel_id_here';

    prismaService.travel.findUnique = jest
      .fn()
      .mockRejectedValue(new Error('Mocked error'));

    await expect(travelRepository.getTravelById(travelId)).rejects.toThrowError(
      'Falha ao buscar viagem',
    );
  });

  it('should update user to pendent', async () => {
    const updateUserAsPendingDTO: UpdateUserAsPendingDTO = {
      travelId: '1',
      userId: '2',
    };

    prismaService.pendingUser.create = jest.fn().mockResolvedValue({});

    await travelRepository.updateUserToPendent(updateUserAsPendingDTO);

    expect(prismaService.pendingUser.create).toHaveBeenCalledWith({
      data: {
        id: expect.any(String),
        travel: {
          connect: { id: updateUserAsPendingDTO.travelId },
        },
        user: {
          connect: { id: updateUserAsPendingDTO.userId },
        },
      },
    });
  });

  it('should handle updateUserToPendent errors', async () => {
    const updateUserAsPendingDTO: UpdateUserAsPendingDTO = {
      travelId: '1',
      userId: '2',
    };

    prismaService.pendingUser.create = jest
      .fn()
      .mockRejectedValue(new Error('Mocked error'));

    await expect(
      travelRepository.updateUserToPendent(updateUserAsPendingDTO),
    ).rejects.toThrowError('Falha ao atualizar usuário para pendente');
  });

  it('should update user to confirmed', async () => {
    const updateUserAsConfirmedDTO: UpdateUserAsConfirmedDTO = {
      travelId: '1',
      userId: '2',
    };

    prismaService.confirmedUser.create = jest.fn().mockResolvedValue({});
    prismaService.pendingUser.deleteMany = jest.fn().mockResolvedValue({});

    await travelRepository.updateUserToConfirmed(updateUserAsConfirmedDTO);

    expect(prismaService.confirmedUser.create).toHaveBeenCalledWith({
      data: {
        id: expect.any(String),
        travel: {
          connect: { id: updateUserAsConfirmedDTO.travelId },
        },
        user: {
          connect: { id: updateUserAsConfirmedDTO.userId },
        },
      },
    });

    expect(prismaService.pendingUser.deleteMany).toHaveBeenCalledWith({
      where: {
        userId: updateUserAsConfirmedDTO.userId,
      },
    });
  });

  it('should handle updateUserToConfirmed errors', async () => {
    const updateUserAsConfirmedDTO: UpdateUserAsConfirmedDTO = {
      travelId: '1',
      userId: '2',
    };

    prismaService.confirmedUser.create = jest
      .fn()
      .mockRejectedValue(new Error('Mocked error'));

    await expect(
      travelRepository.updateUserToConfirmed(updateUserAsConfirmedDTO),
    ).rejects.toThrowError('Falha ao atualizar usuário para confirmado');
  });
});
