import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { BillingsModule } from './billings/billings.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, CustomerModule, BillingsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
