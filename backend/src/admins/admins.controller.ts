import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AdminsService } from './admins.service';
import { Admin } from './admin.entity';

/**
 * Controller for managing admin users.
 * All routes must be protected by JWT authentication and role-based access control.
 *
 * The Controller decorator is intentionally commented out to prevent automatic route registration.
 * Uncomment it when we are ready to manage admin accounts on the web.
 */
// @Controller('admins')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  async create(@Body() data: Omit<Admin, 'id'>): Promise<Admin> {
    return this.adminsService.create(data);
  }

  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Admin> {
    return this.adminsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Omit<Admin, 'id'>>,
  ): Promise<Admin> {
    return this.adminsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.adminsService.remove(id);
  }
}
