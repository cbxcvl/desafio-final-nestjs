import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthRepository } from '../repositories/auth-repository';

@Controller('auth')
export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async login(@Body() body: LoginUserDto) {
    try {
      const { email, password } = body;

      const login = await this.authRepository.login(email, password);

      return login;
    } catch (error) {
      console.error('Error in AuthController:', error);

      throw error;
    }
  }
}
