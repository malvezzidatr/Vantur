import { PrismaUserRepository } from '../../../users/repositories/prisma/prisma-users-repository';
import { PrismaService } from '../../../database/prisma.service';
import { CreateUserDTO } from '../../../users/dto/create-user-body';
import { UpdateUserDTO } from '../../../users/dto/update-user';

describe('PrismaUserRepository', () => {
  let userRepository: PrismaUserRepository;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService(); // Substitua por uma instância de serviço Prisma mock ou real
    userRepository = new PrismaUserRepository(prismaService);
  });

  it('should create a user', async () => {
    const createUserDTO: CreateUserDTO = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      id: '',
      travels: [],
    };

    prismaService.user.create = jest.fn().mockResolvedValue({});

    await userRepository.createUser(createUserDTO);

    expect(prismaService.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
      }),
    });
  });

  it('should handle createUser errors', async () => {
    const createUserDTO: CreateUserDTO = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      id: '',
      travels: [],
    };

    prismaService.user.create = jest
      .fn()
      .mockRejectedValue(new Error('Mocked error'));

    await expect(userRepository.createUser(createUserDTO)).rejects.toThrow(
      'Falha ao criar o usuário',
    );
  });

  it('should get a user by ID', async () => {
    const userId = '1';

    prismaService.user.findUnique = jest.fn().mockResolvedValue({
      id: userId,
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      isAdmin: false,
    });

    const user = await userRepository.getUserById(userId);

    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: {
        id: userId,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        isAdmin: true,
      },
    });

    expect(user).toEqual({
      id: userId,
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      isAdmin: false,
    });
  });

  it('should handle getUserById errors', async () => {
    const userId = 'user_id_here';

    prismaService.user.findUnique = jest
      .fn()
      .mockRejectedValue(new Error('Mocked error'));

    await expect(userRepository.getUserById(userId)).rejects.toThrow(
      'Falha ao encontrar usuário',
    );
  });

  it('should get a user by email', async () => {
    const userEmail = 'user@example.com';

    prismaService.user.findUnique = jest.fn().mockResolvedValue({
      id: 'user_id_here',
      first_name: 'John',
      last_name: 'Doe',
      email: userEmail,
      isAdmin: false,
      password: 'hashed_password',
    });

    const user = await userRepository.getUserByEmail(userEmail);

    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        isAdmin: true,
        password: true,
      },
    });

    expect(user).toEqual({
      id: 'user_id_here',
      first_name: 'John',
      last_name: 'Doe',
      email: userEmail,
      isAdmin: false,
      password: 'hashed_password',
    });
  });

  it('should handle getUserByEmail errors', async () => {
    const userEmail = 'user@example.com';

    prismaService.user.findUnique = jest
      .fn()
      .mockRejectedValue(new Error('Mocked error'));

    await expect(userRepository.getUserByEmail(userEmail)).rejects.toThrow(
      'Falha ao encontrar usuário',
    );
  });

  it('should update a user', async () => {
    const userId = 'user_id_here';
    const updateUserDTO: UpdateUserDTO = {
      email: 'example@gmail.com',
    };

    prismaService.user.update = jest.fn().mockResolvedValue({});

    const updatedUser = await userRepository.updateUser(userId, updateUserDTO);

    expect(prismaService.user.update).toHaveBeenCalledWith({
      where: { id: userId },
      data: updateUserDTO,
    });

    expect(updatedUser).toEqual({});
  });

  it('should handle updateUser errors', async () => {
    const userId = 'user_id_here';
    const updateUserDTO: UpdateUserDTO = {
      email: 'example@gmail.com',
    };

    prismaService.user.update = jest
      .fn()
      .mockRejectedValue(new Error('Mocked error'));

    await expect(
      userRepository.updateUser(userId, updateUserDTO),
    ).rejects.toThrow('Falha ao atualizar usuário');
  });
});
