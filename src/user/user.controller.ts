import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from '../repositories/user-repository';

@Controller('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateUserDto) {
    const { email, name, password } = body;

    const newUser = await this.userRepository.create(email, name, password);

    return newUser;
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
// }
