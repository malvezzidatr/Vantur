import { CreateUserBodyDTO } from 'src/dtos/create-user-body';

export abstract class UserRepository {
  abstract createUser({
    firstName,
    lastName,
    email,
    password,
  }: CreateUserBodyDTO): Promise<void>;

  abstract getUserById(id: number): Promise<any>;

  abstract getUserByEmail(email: string): Promise<any>;
}
