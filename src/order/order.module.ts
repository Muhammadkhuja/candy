import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderResolver } from './order.resolver';
import { Shippingoption } from '../shippingoptions/entities/shippingoption.entity';
import { User } from '../user/entities/user.entity';
import { Savat } from '../savat/entities/savat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Shippingoption, User, Savat]), ],
  controllers: [OrderController],
  providers: [OrderService, OrderResolver],
  exports: [OrderService, OrderResolver],
})
export class OrderModule {}
