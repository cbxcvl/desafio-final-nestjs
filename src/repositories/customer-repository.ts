export abstract class CustomerRepository {
  abstract create(
    name: string,
    phone: string,
    email: string,
    cpf: string,
    supplierId: string,
  ): Promise<{ name: string; email: string }>;
}
