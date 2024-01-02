export abstract class UserRepository {
  abstract create(
    name: string,
    email: string,
    password: string,
  ): Promise<{ name: string; email: string }>;

  abstract update(
    id: string,
    name: string,
    email: string,
    password: string,
    phone?: string,
    cpf?: string,
  ): Promise<{
    name: string;
    email: string;
    phone: number;
    cpf: number;
  }>;
}
