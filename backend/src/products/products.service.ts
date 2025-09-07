import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: EntityRepository<Product>,
  ) {}

  async create(data: Omit<Product, 'id'>): Promise<Product> {
    const product = this.productRepo.create(data);
    const em = this.productRepo.getEntityManager();
    await em.persistAndFlush(product);
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepo.findAll({ orderBy: { id: 'asc' } });
  }

  async findAllEnabledAndInStock(): Promise<Product[]> {
    return this.productRepo.find(
      {
        enabled: true,
        stock_quantity: { $gt: 0 },
      },
      { orderBy: { id: 'asc' } },
    );
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ id });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(
    id: number,
    data: Partial<Omit<Product, 'id'>>,
  ): Promise<Product> {
    const product = await this.findOne(id);
    this.productRepo.assign(product, data);
    const em = this.productRepo.getEntityManager();
    await em.persistAndFlush(product);
    return product;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    const em = this.productRepo.getEntityManager();
    await em.removeAndFlush(product);
  }
}
