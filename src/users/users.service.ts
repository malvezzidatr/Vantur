import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-body';
import { UserRepository } from './repositories/users-repository';
import { UpdateUserDTO } from './dto/update-user';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser({
    id,
    email,
    firstName,
    lastName,
    password,
    salt,
  }: CreateUserDTO): Promise<void> {
    try {
      return await this.userRepository.createUser({
        id,
        firstName,
        lastName,
        email,
        password,
        salt,
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
