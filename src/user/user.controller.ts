import {
  Controller,
  Post,
  Patch,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { AuthGuard } from '../guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateUserDto) {
    const { name, email, password } = body;

    const createdUser = await this.userRepository.create(name, email, password);

    return createdUser;
  }

  @Patch()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async update(
    @Body() body: UpdateUserDto,
    @Req() req: { user: { id: string } },
  ) {
    const id = req.user.id;

    const { name, email, password, phone, cpf } = body;

    const updateUser = await this.userRepository.update(
      id,
      name,
      email,
      password,
      phone,
      cpf,
    );

    return updateUser;
  }
}
