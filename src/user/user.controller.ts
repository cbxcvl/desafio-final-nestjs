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
    @Req() request: { user: { id: string } },
  ) {
    const id = request.user.id;

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

// @Get()
// findAll() {
//   return this.userRepository.findAll();
// }

// @Get(':id')
// findOne(@Param('id') id: string) {
//   return this.userRepository.findOne(+id);
// }

// @Patch(':id')
// update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//   return this.userRepository.update(+id, updateUserDto);
// }

// @Delete(':id')
// remove(@Param('id') id: string) {
//   return this.userRepository.remove(+id);
