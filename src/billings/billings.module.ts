import { Module } from '@nestjs/common';
import { BillingsController } from './billings.controller';
import { PrismaService } from '../database/prisma.service';
import { AuthService } from '../auth/auth.service';
import { BillingRepository } from '../repositories/billing-repository';
import { PrismaBillingRepository } from '../repositories/prisma/prisma-billing-repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [BillingsController],
  providers: [
    PrismaService,
    AuthService,
    { provide: BillingRepository, useClass: PrismaBillingRepository },
  ],
})
export class BillingsModule {}
