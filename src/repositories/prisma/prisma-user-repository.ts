import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user-repository';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}
  async create(
    name: string,
    email: string,
    password: string,
  ): Promise<{ name: string; email: string }> {
    const existingUser = await this.prisma.users.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      throw new ConflictException('E-mail já está em uso');
    }

    const encryptedPassword: string = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.users.create({
      data: {
        name,
        email,
        password_hash: encryptedPassword,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return newUser;
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
    phone: number;
    cpf: number;
    token: string;
  }> {
    const existingUser = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const encryptedPassword: string = await bcrypt.hash(password, 10);

    const updatedUser = await this.prisma.users.update({
      where: { id },
      data: {
        name,
        email,
        password_hash: encryptedPassword,
        phone,
        cpf,
      },
      select: {
        name: true,
        email: true,
        phone: true,
        cpf: true,
      },
    });

    const token = this.authService.generateToken(updatedUser);
    return { ...updatedUser, token };
  }
}
