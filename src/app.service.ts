import { Injectable } from '@nestjs/common';
import { CreateUserBodyDTO } from './dtos/create-user-body';
import { UserRepository } from './repositories/users-repository';

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
  }: CreateUserBodyDTO): Promise<void> {
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
}
