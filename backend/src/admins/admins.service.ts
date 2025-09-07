import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Admin } from './admin.entity';

/**
 * Service for managing Admin entities. Besides the standard CRUD operations,
 * it includes a method to find an admin by email and enabled status. It is to
 * support authentication and authorization processes in the `auth` module.
 */
@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: EntityRepository<Admin>,
  ) {}

  async create(data: Omit<Admin, 'id'>): Promise<Admin> {
    const admin = this.adminRepo.create(data);
    const em = this.adminRepo.getEntityManager();
    await em.persistAndFlush(admin);
    return admin;
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepo.findAll();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepo.findOne({ id });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async update(id: number, data: Partial<Omit<Admin, 'id'>>): Promise<Admin> {
    const admin = await this.findOne(id);
    this.adminRepo.assign(admin, data);
    const em = this.adminRepo.getEntityManager();
    await em.persistAndFlush(admin);
    return admin;
  }

  async remove(id: number): Promise<void> {
    const admin = await this.findOne(id);
    const em = this.adminRepo.getEntityManager();
    await em.removeAndFlush(admin);
  }

  /**
   * Finds an admin by email and ensures the admin is enabled.
   * @returns The admin entity if found and enabled, otherwise null.
   */
  async findByEmailAndEnabled(email: string): Promise<Admin | null> {
    return this.adminRepo.findOne({ email, enabled: true });
  }
}
