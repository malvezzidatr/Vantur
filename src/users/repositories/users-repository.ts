import { CreateUserBodyDTO } from 'src/users/dto/create-user-body';

export abstract class UserRepository {
  abstract createUser({
    id,
    firstName,
    lastName,
    email,
    password,
    salt,
  }: CreateUserBodyDTO): Promise<void>;

  abstract getUserById(id: string): Promise<any>;

  abstract getUserByEmail(email: string): Promise<any>;
}
