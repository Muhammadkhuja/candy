import { Module } from '@nestjs/common';
import { ShippingoptionsService } from './shippingoptions.service';
import { ShippingoptionsController } from './shippingoptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shippingoption } from './entities/shippingoption.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shippingoption])],
  controllers: [ShippingoptionsController],
  providers: [ShippingoptionsService],
  exports: [ShippingoptionsService]
})
export class ShippingoptionsModule {}
