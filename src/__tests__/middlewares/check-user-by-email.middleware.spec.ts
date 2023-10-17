import { Request, Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CheckUserMiddleware } from '../../middleware/check-user-by-email.middleware';
import { UserServiceImpl } from '../../users/services/users-service-impl.service';
import { PrismaUserRepository } from '../../users/repositories/prisma/prisma-users-repository';
import { UserRepository } from '../../users/repositories/users-repository';
import { PrismaService } from '../../database/prisma.service';

describe('CheckUserMiddleware', () => {
  let middleware: CheckUserMiddleware;
  let userService: UserServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserServiceImpl,
        PrismaService,
        {
          provide: UserRepository,
          useClass: PrismaUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserServiceImpl>(UserServiceImpl);
    middleware = new CheckUserMiddleware(userService);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should call next if user does not exist', async () => {
    const req = {
      body: {
        email: 'nonexistent@example.com',
      },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    await middleware.use(req, res, next);

    expect(next).toBeCalled();
    expect(res.status).not.toBeCalled();
    expect(res.json).not.toBeCalled();
  });

  it('should return conflict status and message if user exists', async () => {
    userService.getUserByEmail = jest
      .fn()
      .mockResolvedValue('caiomalvezzi05@gmail.com');

    const req = {
      body: {
        email: 'existing@example.com',
      },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    await middleware.use(req, res, next);

    expect(next).not.toBeCalled();
    expect(res.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Email de usuário já cadastrado.',
    });
  });
});
