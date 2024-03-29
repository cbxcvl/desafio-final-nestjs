import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from '../repositories/customer-repository';
import { JwtModule } from '@nestjs/jwt';
import { PrismaCustomerRepository } from '../repositories/prisma/prisma-customer-repository';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CustomerController],
  providers: [
    PrismaService,
    AuthService,
    { provide: CustomerRepository, useClass: PrismaCustomerRepository },
  ],
})
export class CustomerModule {}
