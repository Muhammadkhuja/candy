import { Module } from '@nestjs/common';
import { SavatitemService } from './savatitem.service';
import { SavatitemController } from './savatitem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavatItem } from './entities/savatitem.entity';
import { Savat } from '../savat/entities/savat.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavatItem, Savat, Product])],
  controllers: [SavatitemController],
  providers: [SavatitemService],
  exports: [SavatitemService]
})
export class SavatitemModule {}
