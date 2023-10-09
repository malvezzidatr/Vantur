import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user-body';
import { UserRepository } from '../repositories/users-repository';
import { UpdateUserDTO } from '../dto/update-user';
import { UsersService } from './users-service';

@Injectable()
export class UserServiceImpl implements UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser({
    id,
    email,
    first_name,
    last_name,
    password,
    salt,
    travels,
  }: CreateUserDTO): Promise<void> {
    try {
      return await this.userRepository.createUser({
        id,
        first_name,
        last_name,
        email,
        password,
        salt,
        travels,
      });
    } catch (err) {
      throw new Error('Falha ao criar o usuário');
    }
  }

  async getUserById(id: string) {
    try {
      return await this.userRepository.getUserById(id);
    } catch (err) {
      throw new Error('Falha ao encontrar usuário');
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.userRepository.getUserByEmail(email);
    } catch (err) {
      throw new Error('Falha ao encontrar usuário');
    }
  }

  async updateUser(id: string, updateUserDTO: UpdateUserDTO) {
    try {
      await this.userRepository.updateUser(id, updateUserDTO);
      return;
    } catch (err) {
      throw new Error('Falha ao atualizar usuário');
    }
  }
}
