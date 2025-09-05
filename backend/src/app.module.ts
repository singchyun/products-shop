import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductsModule } from './products/products.module';
import { AdminsModule } from './admins/admins.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(),
    ProductsModule,
    AdminsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
