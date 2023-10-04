import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from '../users-repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user-body';
import { UpdateUserDTO } from 'src/users/dto/update-user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  abstract: any;

  async createUser({
    id,
    firstName,
    lastName,
    email,
    password,
    salt,
  }: CreateUserDTO): Promise<void> {
    try {
      await this.prisma.user.create({
        data: {
          id,
          firstName,
          lastName,
          email,
          password,
          salt,
        },
      });

      return;
    } catch (err) {
      throw new Error('Falha ao criar o usuário');
    }
  }

  async getUserById(id: string) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
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
          id: true,
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

  async updateUser(id: string, updateUserDTO: UpdateUserDTO) {
    try {
      return await this.prisma.user.update({
        where: { id: id },
        data: updateUserDTO,
      });
    } catch (err) {
      throw new Error('Falha ao atualizar usuário');
    }
  }
}
