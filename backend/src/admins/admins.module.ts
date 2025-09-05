import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { Admin } from './admin.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Admin])],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
