import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserRepository } from '../repositories/user-repository';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserRepository,
          useClass: class UserRepositoryMock extends UserRepository {
            async create(
              name: string,
              email: string,
              password: string,
            ): Promise<{ name: string; email: string }> {
              return { name, email };
            }

            async update(
              id: string,
              name?: string,
              email?: string,
              password?: string,
              phone?: string,
              cpf?: string,
            ): Promise<{
              name: string;
              email: string;
              phone: string;
              cpf: string;
              token: string;
            }> {
              return {
                name: name || '',
                email: email || '',
                phone: phone || '',
                cpf: cpf || '',
                token: 'mockedToken',
              };
            }
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createDto: CreateUserDto = {
        name: 'John Doe',
        email: 'novoemail@example.com',
        password: 'password123',
      };

      jest.spyOn(userRepository, 'create').mockResolvedValue({
        name: createDto.name,
        email: createDto.email,
      });

      const result = await controller.create(createDto);

      expect(result).toEqual({ name: createDto.name, email: createDto.email });

      expect(userRepository.create).toHaveBeenCalledWith(
        createDto.name,
        createDto.email,
        createDto.password,
      );
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const userId = 'mockedUserId';
      const updateDto = {
        name: 'Updated John Doe',
        email: 'updated.john.doe@example.com',
        password: 'newpassword456',
        phone: '123456789',
        cpf: '987654321',
      };

      jest.spyOn(userRepository, 'update').mockResolvedValue({
        name: updateDto.name,
        email: updateDto.email,
        phone: updateDto.phone,
        cpf: updateDto.cpf,
        token: 'mockedToken',
      });

      const result = await controller.update(userId, updateDto);

      expect(result).toEqual({
        name: updateDto.name,
        email: updateDto.email,
        phone: updateDto.phone,
        cpf: updateDto.cpf,
        token: 'mockedToken',
      });

      expect(userRepository.update).toHaveBeenCalledWith(
        userId,
        updateDto.name,
        updateDto.email,
        updateDto.password,
        updateDto.phone,
        updateDto.cpf,
      );
    });
  });
});
