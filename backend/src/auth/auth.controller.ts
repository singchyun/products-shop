import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

/**
 * Authentication controller. Frontend clients will use this to log in and receive a JWT.
 * The reason for the 'authe/logsin' path is to avoid potential conflicts with NGINX config files.
 */
@Controller('authe')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('logsin')
  async login(@Request() req) {
    // req.user is set by LocalAuthGuard after successful validation
    return this.authService.login(req.user);
  }
}
