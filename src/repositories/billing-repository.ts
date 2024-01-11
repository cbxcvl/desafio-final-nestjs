export abstract class BillingRepository {
  abstract create(
    description: string,
    status: string,
    value: number,
    dueDate: Date,
    customerId: string,
    supplierId: string,
  ): Promise<{
    id: string;
    description: string;
    status: string;
    value: number;
    dueDate: Date;
    customerId: string;
    supplierId: string;
    created_at: Date;
    updated_at: Date;
  }>;
}
