import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceImpl } from '../../../users/services/users-service-impl.service';
import { UserRepository } from '../../../users/repositories/users-repository';
import { CreateUserDTO } from '../../../users/dto/create-user-body';
import { UpdateUserDTO } from 'src/users/dto/update-user';

// Crie uma classe de mock para UserRepository para evitar interações com o banco de dados real
class UserRepositoryMock {
  createUser() {}
  getUserById() {}
  getUserByEmail() {}
  updateUser() {}
}

describe('UserServiceImpl', () => {
  let userService: UserServiceImpl;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserServiceImpl,
        {
          provide: UserRepository,
          useClass: UserRepositoryMock, // Use a classe de mock em vez da classe real
        },
      ],
    }).compile();

    userService = module.get<UserServiceImpl>(UserServiceImpl);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDTO: CreateUserDTO = {
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Doe',
      password: 'password',
      travels: [],
      id: '',
    };

    const createUserSpy = jest
      .spyOn(userRepository, 'createUser')
      .mockResolvedValue();

    await userService.createUser(createUserDTO);

    expect(createUserSpy).toHaveBeenCalledWith(createUserDTO);
  });

  it('should throw an error when createUser fails', async () => {
    const createUserDTO: CreateUserDTO = {
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Doe',
      password: 'password',
      travels: [],
      id: '',
    };

    const errorMessage = 'Falha ao criar o usuário';
    jest
      .spyOn(userRepository, 'createUser')
      .mockRejectedValue(new Error(errorMessage));

    try {
      await userService.createUser(createUserDTO);
      // Se createUser não lançar um erro, o teste deve falhar
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });

  it('should get user by id', async () => {
    const id = '1';

    const getUserById = jest
      .spyOn(userRepository, 'getUserById')
      .mockResolvedValue(id);

    await userService.getUserById(id);
    expect(getUserById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when getUserById fail', async () => {
    const id = '1';
    const errorMessage = 'Falha ao encontrar usuário';

    jest
      .spyOn(userRepository, 'getUserById')
      .mockRejectedValue(new Error(errorMessage));

    try {
      await userService.getUserById(id);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });

  it('should get user by email', async () => {
    const email = 'jest@example.com.br';

    const getUserByEmail = jest
      .spyOn(userRepository, 'getUserByEmail')
      .mockResolvedValue(email);

    await userService.getUserByEmail(email);
    expect(getUserByEmail).toHaveBeenCalledWith(email);
  });

  it('should throw an error when getUserById fail', async () => {
    const email = 'jest@example.com.br';
    const errorMessage = 'Falha ao encontrar usuário';

    jest
      .spyOn(userRepository, 'getUserByEmail')
      .mockRejectedValue(new Error(errorMessage));

    try {
      await userService.getUserByEmail(email);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });

  it('should update an user', async () => {
    const id = '1';
    const updateUserDTO: UpdateUserDTO = {
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Doe',
      password: 'password',
    };

    const updateUserSpy = jest
      .spyOn(userRepository, 'updateUser')
      .mockResolvedValue(updateUserDTO);

    await userService.updateUser(id, updateUserDTO);

    expect(updateUserSpy).toHaveBeenCalledWith(id, updateUserDTO);
  });

  it('should update an user', async () => {
    const id = '1';
    const updateUserDTO: UpdateUserDTO = {
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Doe',
      password: 'password',
    };
    const errorMessage = 'Falha ao atualizar usuário';
    jest.spyOn(userRepository, 'updateUser').mockRejectedValue(updateUserDTO);

    try {
      await userService.updateUser(id, updateUserDTO);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
