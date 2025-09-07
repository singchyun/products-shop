import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Product {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({
    default:
      'https://myshopproductsimages.s3.ap-southeast-1.amazonaws.com/image-not-found.webp',
  })
  image_url!: string;

  @Property({ nullable: true, length: 1024 })
  description?: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Property()
  stock_quantity!: number;

  @Property({ default: true })
  enabled!: boolean;
}
