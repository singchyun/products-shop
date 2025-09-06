import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  ProductsController,
  ProductsPublicController,
} from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Product])],
  controllers: [ProductsController, ProductsPublicController],
  providers: [ProductsService],
})
export class ProductsModule {}
