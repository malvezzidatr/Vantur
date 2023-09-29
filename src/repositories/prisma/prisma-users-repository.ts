import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from '../users-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(
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
}
