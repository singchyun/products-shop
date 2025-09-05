import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly em: EntityManager) {}

  async create(data: Omit<Product, 'id'>): Promise<Product> {
    const product = this.em.create(Product, data);
    await this.em.persistAndFlush(product);
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.em.find(Product, {});
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.em.findOne(Product, { id });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(
    id: number,
    data: Partial<Omit<Product, 'id'>>,
  ): Promise<Product> {
    const product = await this.findOne(id);
    this.em.assign(product, data);
    await this.em.persistAndFlush(product);
    return product;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.em.removeAndFlush(product);
  }
}
