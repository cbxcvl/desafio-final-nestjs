import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: any): string {
    return this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}
