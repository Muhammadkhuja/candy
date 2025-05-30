import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { User } from "../user/entities/user.entity";
import { Shippingoption } from "../shippingoptions/entities/shippingoption.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Shippingoption)
    private readonly shippingoptionRepo: Repository<Shippingoption>
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepo.create(createOrderDto)
    return this.orderRepo.save(order);
  }

  
  async findAll() {
    return this.orderRepo.find({ relations: ["user_id", "shippingoption_id"]});
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOneBy({ id });
    if (!order) {
      throw new NotFoundException("Order topilmadi");
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ["user_id"],
    });

    if (!order) {
      throw new NotFoundException("Karta topilmadi");
    }
    Object.assign(order, updateOrderDto);

    if (updateOrderDto.user_id) {
      const user = await this.userRepo.findOneBy({
        id: updateOrderDto.user_id,
      });
      if (!user) {
        throw new NotFoundException("Foydalanuvchi topilmadi");
      }
      order.user_id = user;
    }

    if (updateOrderDto.user_id) {
      const user = await this.shippingoptionRepo.findOneBy({
        id: updateOrderDto.user_id,
      });
      if (!user) {
        throw new NotFoundException("Foydalanuvchi topilmadi");
      }
      order.shippingoption_id = user;
    }

    return await this.orderRepo.save(order);
  }

  async remove(id: number) {
    const result = await this.orderRepo.delete(id);
    if (!result.affected) {
      throw new NotFoundException("Order topilmadi");
    }
    return { message: "Order muvaffaqiyatli o'chirildi" };
  }
}
