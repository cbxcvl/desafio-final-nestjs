import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BillingRepository } from '../repositories/billing-repository';
import { CreateBillingDto } from './dto/create-billing.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('billing')
export class BillingsController {
  constructor(private readonly billingRepository: BillingRepository) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreateBillingDto, @Req() req: { user: { id: string } }) {
    const { description, status, value, dueDate, customerId } = body;
    const { id } = req.user;
    const supplierId = id;

    return this.billingRepository.create(
      description,
      status,
      value,
      dueDate,
      customerId,
      supplierId,
    );
  }
}
