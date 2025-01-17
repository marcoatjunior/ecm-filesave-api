import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { excecoes } from 'src/common/resources';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(AuthenticationGuard.name);

  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      this.logger.error(err || excecoes.naoAutenticado);
      throw new UnauthorizedException(excecoes.naoAutenticado);
    }
    return user;
  }
}
