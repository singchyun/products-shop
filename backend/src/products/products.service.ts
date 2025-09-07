import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Product } from './product.entity';

/**
 * Service for managing Product entities. It provides standard CRUD operations
 * along with methods to find products that are enabled and in stock.
 */
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

  /**
   * Retrieves all products from the database. **DO NOT call this from a public-facing endpoint** because
   * it will expose products that are disabled or out of stock. For public-facing endpoints, use
   * `findAllEnabledAndInStock()` instead.
   * @returns An array of all Product entities in ascending order by ID.
   */
  async findAll(): Promise<Product[]> {
    return this.productRepo.findAll({ orderBy: { id: 'asc' } });
  }

  /**
   * Retrieves all products that are enabled and have stock quantity greater than zero.
   * This method is safe to call from public-facing endpoints.
   * @returns An array of Product entities that are enabled and have stock quantity greater than zero, in ascending order by ID.
   */
  async findAllEnabledAndInStock(): Promise<Product[]> {
    return this.productRepo.find(
      {
        enabled: true,
        stock_quantity: { $gt: 0 },
      },
      { orderBy: { id: 'asc' } },
    );
  }

  /**
   * Retrieves a single product by its ID. **DO NOT call this from a public-facing endpoint** because
   * it will expose products that are disabled or out of stock. For public-facing endpoints, use
   * `findOneEnabledAndInStock()` instead.
   * @param id The ID of the product to retrieve.
   * @returns The Product entity with the specified ID.
   * @throws NotFoundException if the product with the given ID does not exist.
   */
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ id });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
  /**
   * Retrieves a single product by its ID. This method is safe to call from public-facing endpoints.
   * @param id The ID of the product to retrieve.
   * @returns The Product entity with the specified ID.
   * @throws NotFoundException if the product with the given ID does not exist.
   */
  async findOneEnabledAndInStock(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({
      id,
      enabled: true,
      stock_quantity: { $gt: 0 },
    });
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
