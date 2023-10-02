export abstract class UserRepository {
  abstract createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void>;

  abstract getUser(id: number): Promise<any>;
}
