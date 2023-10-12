import { PrismaService } from '../../../database/prisma.service';
import { UserRepository } from '../users-repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../../../users/dto/create-user-body';
import { UpdateUserDTO } from '../../../users/dto/update-user';
import { v4 as uuidv4 } from 'uuid';
import { encryptPsswd } from 'src/utils/crypto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  abstract: any;

  async createUser(createUserDTO: CreateUserDTO): Promise<void> {
    const { first_name, last_name, email, password } = createUserDTO;
    try {
      await this.prisma.user.create({
        data: {
          id: uuidv4(),
          first_name,
          last_name,
          email,
          password: String(await encryptPsswd(password)),
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
          first_name: true,
          last_name: true,
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
          first_name: true,
          last_name: true,
          email: true,
          isAdmin: true,
          password: true,
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
