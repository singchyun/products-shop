import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Admin } from './admin.entity';

@Controller('admins')
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
