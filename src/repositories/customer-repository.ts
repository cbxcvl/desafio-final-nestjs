export abstract class CustomerRepository {
  abstract create(
    name: string,
    phone: string,
    email: string,
    cpf: string,
    supplierId: string,
  ): Promise<{ name: string; email: string }>;

  abstract getAll(): Promise<
    {
      id: string;
      name: string;
      phone: string;
      email: string;
      cpf: string;
      cep: string | null;
      city: string | null;
      uf: string | null;
      address: string | null;
      complement: string | null;
      neighborhood: string | null;
      supplierId: string;
      created_at: Date;
      updated_at: Date;
    }[]
  >;

  abstract getId(customerId: string): Promise<{
    id: string;
    name: string;
    phone: string;
    email: string;
    cpf: string;
    cep: string | null;
    city: string | null;
    uf: string | null;
    address: string | null;
    complement: string | null;
    neighborhood: string | null;
    supplierId: string;
    created_at: Date;
    updated_at: Date;
  }>;
}
