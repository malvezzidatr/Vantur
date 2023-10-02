import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from '../users-repository';
import { Injectable } from '@nestjs/common';
import { CreateUserBodyDTO } from 'src/dtos/create-user-body';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  abstract: any;

  async createUser({
    firstName,
    lastName,
    email,
    password,
  }: CreateUserBodyDTO): Promise<void> {
    try {
      await this.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
        },
      });

      return;
    } catch (err) {
      throw new Error('Falha ao criar o usuário');
    }
  }

  async getUserById(id: number) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          firstName: true,
          lastName: true,
          email: true,
          isAdmin: true,
        },
      });
    } catch (err) {
      throw new Error('Falha ao encontrar usuário');
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          firstName: true,
          lastName: true,
          email: true,
          isAdmin: true,
        },
      });
    } catch (err) {
      throw new Error('Falha ao encontrar usuário');
    }
  }
}
