import { Module } from '@nestjs/common';
import { ShippingoptionsService } from './shippingoptions.service';
import { ShippingoptionsController } from './shippingoptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shippingoption } from './entities/shippingoption.entity';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shippingoption]), OrderModule],
  controllers: [ShippingoptionsController],
  providers: [ShippingoptionsService],
  exports: [ShippingoptionsService]
})
export class ShippingoptionsModule {}
