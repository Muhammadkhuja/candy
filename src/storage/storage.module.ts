import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storage } from './entities/storage.entity';
import { Product } from '../product/entities/product.entity';
import { StorageResolver } from './storage.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Storage, Product])],
  controllers: [StorageController],
  providers: [StorageService, StorageResolver],
  exports: [StorageService, StorageResolver],
})
export class StorageModule {}
