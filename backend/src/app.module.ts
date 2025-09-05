import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MikroOrmModule.forRoot(), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
