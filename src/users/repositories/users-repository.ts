import { CreateUserDTO } from 'src/users/dto/create-user-body';
import { UpdateUserDTO } from '../dto/update-user';

export abstract class UserRepository {
  abstract createUser({
    id,
    firstName,
    lastName,
    email,
    password,
    salt,
  }: CreateUserDTO): Promise<void>;

  abstract getUserById(id: string): Promise<any>;

  abstract getUserByEmail(email: string): Promise<any>;

  abstract updateUser(id: string, updateUserDTO: UpdateUserDTO);
}
