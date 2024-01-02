import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthRepository } from '../repositories/auth-repository';
import { LoginUserDto } from './dto/login-user.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

class MockAuthRepository implements AuthRepository {
  async login(email: string, password: string): Promise<{ token: string }> {
    // Implement mock behavior as needed for your tests
    if (email === 'existing@example.com' && password === 'valid_password') {
      return { token: 'mocked_token' };
    } else if (email === 'nonexistent@example.com') {
      throw new NotFoundException('Usuário não encontrado');
    } else {
      throw new UnauthorizedException('Senha inválida');
    }
  }
}

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthRepository,
          useClass: MockAuthRepository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a token for valid credentials', async () => {
      const loginDto: LoginUserDto = {
        email: 'existing@example.com',
        password: 'valid_password',
      };

      const result = await controller.login(loginDto);

      expect(result).toEqual({ token: 'mocked_token' });
    });

    it('should throw NotFoundException for nonexistent user', async () => {
      const loginDto: LoginUserDto = {
        email: 'nonexistent@example.com',
        password: 'some_password',
      };

      await expect(controller.login(loginDto)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      const loginDto: LoginUserDto = {
        email: 'existing@example.com',
        password: 'invalid_password',
      };

      await expect(controller.login(loginDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
