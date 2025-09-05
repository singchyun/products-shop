import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from '../admins/admins.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string) {
    const admin = await this.adminsService.findByEmailAndEnabled(email);
    if (!admin) throw new UnauthorizedException('Invalid credentials');
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    return admin;
  }

  async login(admin: any) {
    const payload = { id: admin.id, email: admin.email, roles: admin.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
