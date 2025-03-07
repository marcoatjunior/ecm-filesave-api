import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { excecoes } from 'src/common/resources';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const userPermissions = context.getArgs()[0].user.permissions;

    if (!userPermissions) {
      throw new ForbiddenException(excecoes.semAutorizacao);
    }

    const routePermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!routePermissions) {
      return true;
    }

    if (
      routePermissions.every((routePermission) =>
        userPermissions.includes(routePermission),
      )
    ) {
      return true;
    }

    throw new ForbiddenException(
      `${excecoes.semPermissao} (${routePermissions})`,
    );
  }
}
