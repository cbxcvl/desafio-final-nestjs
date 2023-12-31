import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from '../repositories/user-repository';
import { AuthGuard } from '../guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateUserDto) {
    const { name, email, password } = body;

    const newUser = await this.userRepository.create(name, email, password);

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
