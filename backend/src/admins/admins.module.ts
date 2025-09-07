import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AdminsService } from './admins.service';
import { Admin } from './admin.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Admin])],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
