import { Module } from '@nestjs/common';
import { OrderitemsService } from './orderitems.service';
import { OrderitemsController } from './orderitems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orderitem } from './entities/orderitem.entity';
import { Order } from '../order/entities/order.entity';
import { Product } from '../product/entities/product.entity';
import { OrderitemsResolver } from './orderitems.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Orderitem, Order, Product])],
  controllers: [OrderitemsController],
  providers: [OrderitemsService, OrderitemsResolver],
  exports: [OrderitemsService, OrderitemsResolver],
})
export class OrderitemsModule {}
