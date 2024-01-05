import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CustomerRepository } from '../customer-repository';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async create(
    name: string,
    phone: string,
    email: string,
    cpf: string,
    supplierId: string,
  ): Promise<{ name: string; email: string }> {
    try {
      const existingCustomer = await this.prisma.customers.findFirst({
        where: {
          email,
          supplierId,
        },
      });

      if (existingCustomer) {
        throw new ConflictException('E-mail já está em uso');
      }

      const newCustomer = await this.prisma.customers.create({
        data: {
          name,
          phone,
          email,
          cpf,
          supplierId,
        },
        select: {
          name: true,
          email: true,
        },
      });

      return { name: newCustomer.name, email: newCustomer.email };
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
