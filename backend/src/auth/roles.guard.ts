import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      this.logger.debug('No required roles set, allowing access.');
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    this.logger.debug(`User: ${JSON.stringify(user)}`);
    this.logger.debug(`Required roles: ${JSON.stringify(requiredRoles)}`);
    const hasRole =
      user &&
      user.roles &&
      requiredRoles.some((role) => user.roles.includes(role));
    this.logger.debug(`Access granted: ${hasRole}`);
    return hasRole;
  }
}
