import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceImpl } from '../../services/users-service-impl.service';
import { UserRepository } from '../../repositories/users-repository';
import { CreateUserDTO } from '../../dto/create-user-body';

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

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDTO: CreateUserDTO = {
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        password: 'password',
        travels: [],
        id: '',
        salt: '',
      };

      const createUserSpy = jest
        .spyOn(userRepository, 'createUser')
        .mockResolvedValue(undefined);

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
        salt: '',
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
  });

  // Repita o processo para testar outras funções como getUserById, getUserByEmail e updateUser
});
