import { IsString, IsNotEmpty, IsInt, IsDateString } from 'class-validator';

export class CreateBillingDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsInt()
  @IsNotEmpty()
  value: number;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;
}
