import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerRepository } from '../repositories/customer-repository';
import { AuthGuard } from '../guards/auth.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerRepository: CustomerRepository) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  create(
    @Body() body: CreateCustomerDto,
    @Req() req: { user: { id: string } },
  ) {
    const { name, phone, email, cpf } = body;
    const { id } = req.user;
    const supplierId = id;

    return this.customerRepository.create(name, phone, email, cpf, supplierId);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAll() {
    return this.customerRepository.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getId(@Param('id') customerId: string) {
    return this.customerRepository.getId(customerId);
  }
}
