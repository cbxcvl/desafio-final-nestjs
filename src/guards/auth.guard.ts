import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const token = request.headers['authorization'];

      if (!token || !token.startsWith('Bearer ')) {
        throw new Error('Token de autorização ausente ou inválido');
      }

      const authToken = token.split(' ')[1];

      const decodedToken = this.jwtService.verify(authToken);

      if (!decodedToken) {
        throw new Error('Falha na verificação do token JWT');
      }

      request.user = decodedToken;

      return true;
    } catch (error) {
      console.error('Erro durante a autenticação:', error);
      return false;
    }
  }
}
