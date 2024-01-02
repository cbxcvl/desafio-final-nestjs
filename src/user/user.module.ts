import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from '../database/prisma.service';
import { UserRepository } from '../repositories/user-repository';
import { PrismaUserRepository } from '../repositories/prisma/prisma-user-repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [
    PrismaService,
    AuthService,
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
})
export class UserModule {}
