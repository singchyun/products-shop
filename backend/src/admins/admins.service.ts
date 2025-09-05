import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Admin } from './admin.entity';

@Injectable()
export class AdminsService {
  constructor(private readonly em: EntityManager) {}

  async create(data: Omit<Admin, 'id'>): Promise<Admin> {
    const admin = this.em.create(Admin, data);
    await this.em.persistAndFlush(admin);
    return admin;
  }

  async findAll(): Promise<Admin[]> {
    return this.em.find(Admin, {});
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.em.findOne(Admin, { id });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async update(id: number, data: Partial<Omit<Admin, 'id'>>): Promise<Admin> {
    const admin = await this.findOne(id);
    this.em.assign(admin, data);
    await this.em.persistAndFlush(admin);
    return admin;
  }

  async remove(id: number): Promise<void> {
    const admin = await this.findOne(id);
    await this.em.removeAndFlush(admin);
  }
}
