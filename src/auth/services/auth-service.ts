export abstract class AuthService {
  abstract signIn(email: string, password: string): Promise<any>;
}
