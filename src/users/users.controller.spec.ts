import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { CreateUserDTO } from './dto/create-user-body';
import { UserServiceImpl } from './services/users-service-impl.service';
import { PrismaService } from '../database/prisma.service';
import { UserRepository } from './repositories/users-repository';
import { PrismaUserRepository } from './repositories/prisma/prisma-users-repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants/token';
import { createResponse } from 'node-mocks-http';
import { HttpStatus } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userServiceImpl: UserServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: jwtConstants.secret })],
      providers: [
        UserServiceImpl,
        PrismaService,
        {
          provide: UserRepository,
          useClass: PrismaUserRepository,
        },
      ],
      controllers: [UserController],
      exports: [UserServiceImpl],
    }).compile();

    userController = module.get<UserController>(UserController);
    userServiceImpl = module.get<UserServiceImpl>(UserServiceImpl);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userServiceImpl).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDTO: CreateUserDTO = {
        email: 'jest@example.com',
        first_name: 'John',
        last_name: 'Doe',
        password: 'password',
        travels: [],
        id: '',
        salt: '',
      };
      jest
        .spyOn(userServiceImpl, 'createUser')
        .mockResolvedValue(createUserDTO);
      const response = createResponse();
      await userController.createUser(createUserDTO, response);

      expect(response._getStatusCode()).toBe(HttpStatus.CREATED);
    });

    it('should handle errors when creating a user', async () => {
      const createUserDTO: CreateUserDTO = {
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        password: 'password',
        travels: [],
        id: '',
        salt: '',
      };

      jest
        .spyOn(userServiceImpl, 'createUser')
        .mockRejectedValue(new Error('Failed to create user'));
      const response = createResponse();

      try {
        await userController.createUser(createUserDTO, response);
      } catch (error) {
        expect(error.message).toBe('Falha ao criar o usuário');
      }
    });
  });

  // Add similar tests for other controller methods (getUserById, getUserByEmail, updateUser).
});
