export abstract class UserRepository {
  abstract create(
    name: string,
    email: string,
    password: string,
  ): Promise<{ name: string; email: string }>;
}
