import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Product } from './src/products/product.entity';

const config: Options = {
  driver: PostgreSqlDriver,
  host: 'localhost',
  port: 5432,
  dbName: 'mandai',
  user: 'mandaiuser',
  password: 'askides,0p',
  entities: [Product],
  debug: true,
};

export default config;
