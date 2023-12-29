import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from '../database/prisma.service';
import { UserRepository } from '../repositories/user-repository';
import { PrismaUserRepository } from '../repositories/prisma/prisma-user-repository';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
})
export class UserModule {}
