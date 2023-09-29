import { Injectable } from '@nestjs/common';
import { CreateUserBodyDTO } from './dtos/create-user-body';
import { UserRepository } from './repositories/users-repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser({
    email,
    firstName,
    lastName,
    password,
  }: CreateUserBodyDTO): Promise<void> {
    try {
      return await this.userRepository.create(
        firstName,
        lastName,
        email,
        password,
      );
    } catch (err) {
      throw new Error('Falha ao criar o usuário');
    }
  }
}
