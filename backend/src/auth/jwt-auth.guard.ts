import { Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest(err, user, info, context) {
    this.logger.debug(
      `JwtAuthGuard handleRequest: user=${JSON.stringify(user)}, err=${err}, info=${JSON.stringify(info)}`,
    );
    return super.handleRequest(err, user, info, context);
  }
}
