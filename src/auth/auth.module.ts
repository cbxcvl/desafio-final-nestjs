import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaService } from '../database/prisma.service';
import { AuthRepository } from '../repositories/auth-repository';
import { PrismaAuthRepository } from '../repositories/prisma/prisma-auth-repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    { provide: AuthRepository, useClass: PrismaAuthRepository },
  ],
})
export class AuthModule {}
