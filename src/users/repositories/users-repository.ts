import { CreateUserDTO } from '../../users/dto/create-user-body';
import { UpdateUserDTO } from '../dto/update-user';

export abstract class UserRepository {
  abstract createUser({
    id,
    first_name,
    last_name,
    email,
    password,
  }: CreateUserDTO): Promise<void>;

  abstract getUserById(id: string): Promise<any>;

  abstract getUserByEmail(email: string): Promise<any>;

  abstract updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<any>;
}
