import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from '../users-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  abstract: any;

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void> {
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

  async getUser(id: number) {
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
      throw new Error('Falha na procura de usuário');
    }
  }
}
