import { CreateUserDTO } from '../dto/create-user-body';
import { UpdateUserDTO } from '../dto/update-user';

export abstract class UsersService {
  abstract createUser({
    id,
    email,
    first_name,
    last_name,
    password,
    travels,
  }: CreateUserDTO): Promise<any>;

  abstract getUserById(id: string): Promise<void>;

  abstract getUserByEmail(email: string): Promise<void>;

  abstract updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<any>;
}
