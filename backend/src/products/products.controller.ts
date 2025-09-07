import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

/**
 * Private controller to manage products. This controller is protected by JWT authentication
 * and role-based access control, allowing only users with the 'admin' role to perform
 * create, read, update, and delete operations on products.
 */
@Controller('private/products')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() data: Omit<Product, 'id'>): Promise<Product> {
    return this.productsService.create(data);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Omit<Product, 'id'>>,
  ): Promise<Product> {
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}

/**
 * Public controller to allow unauthenticated access to product listings
 * and details. This controller does not require any authentication or roles.
 */
@Controller('public/products')
export class ProductsPublicController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * @returns Returns a list of all products that are enabled and still has stock.
   */
  @Get()
  async findEnabledAndInStock(): Promise<Product[]> {
    return this.productsService.findAllEnabledAndInStock();
  }

  /**
   * @returns Returns a product that is enabled and still has stock.
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    // It is important to use the method that checks for enabled and in-stock status.
    // Do not use the regular findOne() method here.
    return this.productsService.findOneEnabledAndInStock(id);
  }
}
