import { Module } from '@nestjs/common';
import { SevimliService } from './sevimli.service';
import { SevimliController } from './sevimli.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sevimli } from './entities/sevimli.entity';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sevimli, User, Product])],
  controllers: [SevimliController],
  providers: [SevimliService],
  exports: [SevimliService]
})
export class SevimliModule {}
