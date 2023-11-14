import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../users/controller/users.controller';
import { CreateUserDTO } from '../../../users/dto/create-user-body';
import { UserServiceImpl } from '../../../users/services/users-service-impl.service';
import { PrismaService } from '../../../database/prisma.service';
import { UserRepository } from '../../../users/repositories/users-repository';
import { PrismaUserRepository } from '../../../users/repositories/prisma/prisma-users-repository';
import { JwtModule } from '@nestjs/jwt';
import { createResponse } from 'node-mocks-http';
import { HttpStatus } from '@nestjs/common';
import { UpdateUserDTO } from '../../../users/dto/update-user';

describe('UserController', () => {
  let userController: UserController;
  let userServiceImpl: UserServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: process.env.SECRET })],
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

  it('should create a user', async () => {
    const createUserDTO: CreateUserDTO = {
      email: 'jest@example.com',
      first_name: 'John',
      last_name: 'Doe',
      password: 'password',
      travels: [],
      id: '',
    };
    jest.spyOn(userServiceImpl, 'createUser').mockResolvedValue();
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

  it('should get user by id', async () => {
    const id = 'teste';
    jest.spyOn(userServiceImpl, 'getUserById').mockResolvedValue(id);
    const response = createResponse();
    await userController.getUserById(id, response);
    expect(response._getStatusCode()).toBe(200);
  });

  it('should error in get user by id', async () => {
    const id = 'teste';
    jest.spyOn(userServiceImpl, 'getUserById').mockRejectedValue(id);
    const response = createResponse();
    try {
      await userController.getUserById(id, response);
    } catch (error) {
      expect(error.message).toBe('Falha ao encontrar usuário');
    }
  });

  it('should get user by email', async () => {
    const email = 'jest@gmail.com';
    jest.spyOn(userServiceImpl, 'getUserByEmail').mockResolvedValue(email);
    const response = createResponse();
    await userController.getUserByEmail(email, response);
    expect(response._getStatusCode()).toBe(200);
  });

  it('should get user by email', async () => {
    const email = 'jest@gmail.com';
    jest.spyOn(userServiceImpl, 'getUserByEmail').mockRejectedValue(email);
    const response = createResponse();
    try {
      await userController.getUserByEmail(email, response);
    } catch (error) {
      expect(error.message).toBe('Falha ao encontrar usuário');
    }
  });

  it('should update a user', async () => {
    const updatedUser: UpdateUserDTO = {
      email: 'jest_test@gmail.com',
    };

    jest.spyOn(userServiceImpl, 'updateUser').mockResolvedValue();
    const response = createResponse();
    await userController.updateUser('1', updatedUser, response);
    expect(response._getStatusCode()).toBe(204);
  });

  it('should update a user', async () => {
    const updatedUser: UpdateUserDTO = {
      email: 'jest_test@gmail.com',
    };

    jest.spyOn(userServiceImpl, 'updateUser').mockRejectedValue(updatedUser);
    const response = createResponse();
    try {
      await userController.updateUser('1', updatedUser, response);
    } catch (error) {
      expect(error.message).toBe('Falha ao atualizar usuário');
    }
  });
});
