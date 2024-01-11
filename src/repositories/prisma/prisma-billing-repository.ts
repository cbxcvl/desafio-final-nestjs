import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { BillingRepository } from '../billing-repository';

@Injectable()
export class PrismaBillingRepository implements BillingRepository {
  constructor(private prisma: PrismaService) {}

  async create(
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
  }> {
    try {
      const existingBilling = await this.prisma.billings.findFirst({
        where: {
          status,
          value,
          description,
          customerId,
          supplierId,
        },
      });

      if (existingBilling) {
        throw new ConflictException('This Billing already exists');
      }

      const newBilling = await this.prisma.billings.create({
        data: {
          description,
          status,
          value,
          dueDate,
          customerId,
          supplierId,
        },
      });

      return newBilling;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
