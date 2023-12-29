import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user-repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

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
        email,
        name,
        password_hash: encryptedPassword,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return newUser;
  }
}
