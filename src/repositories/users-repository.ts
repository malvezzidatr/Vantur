export abstract class UserRepository {
  abstract create(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void>;
}
