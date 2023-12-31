import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaService } from '../database/prisma.service';
import { AuthRepository } from '../repositories/auth-repository';
import { PrismaAuthRepository } from '../repositories/prisma/prisma-auth-repository';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    { provide: AuthRepository, useClass: PrismaAuthRepository },
  ],
})
export class AuthModule {}
