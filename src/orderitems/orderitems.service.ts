import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Orderitem } from "./entities/orderitem.entity";
import { CreateOrderitemDto } from "./dto/create-orderitem.dto";
import { UpdateOrderitemDto } from "./dto/update-orderitem.dto";
import { Order } from "../order/entities/order.entity";
import { Product } from "../product/entities/product.entity";

@Injectable()
export class OrderitemsService {
  constructor(
    @InjectRepository(Orderitem)
    private readonly orderitemRepo: Repository<Orderitem>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}

  async create(createOrderitemDto: CreateOrderitemDto) {
    // Order va Productni bazadan topamiz
    const order = await this.orderRepo.findOne({
      where: { id: createOrderitemDto.order },
    });
    if (!order) {
      throw new NotFoundException("Buyurtma topilmadi");
    }

    const product = await this.productRepo.findOne({
      where: { id: createOrderitemDto.product },
    });
    if (!product) {
      throw new NotFoundException("Mahsulot topilmadi");
    }

    // Yangi orderitem yaratamiz va bog‘laymiz
    const orderitem = this.orderitemRepo.create({
      quantity: createOrderitemDto.quantity,
      unit_price: createOrderitemDto.unit_price,
      order: order,
      product: product,
    });

    // Saqlaymiz
    return this.orderitemRepo.save(orderitem);
  }

  async findAll() {
    return this.orderitemRepo.find({
      relations: ["product", "order"],
    });
  }

  async findOne(id: number) {
    const orderitem = await this.orderitemRepo.findOne({
      where: { id },
      relations: ["product", "order"],
    });

    if (!orderitem) {
      throw new NotFoundException("Orderitem topilmadi");
    }
    return orderitem;
  }


  async update(id: number, updateOrderitemDto: UpdateOrderitemDto) {
    const orderItem = await this.orderitemRepo.findOne({
      where: { id },
      relations: ["order", "product"],
    });

    if (!orderItem) {
      throw new NotFoundException("Orderitem topilmadi");
    }

    // DTO dan oddiy qiymatlarni o‘zgartirish
    Object.assign(orderItem, updateOrderitemDto);

    // order_id bo‘lsa, tegishli order borligini tekshiramiz
    if (updateOrderitemDto.order) {
      const order = await this.orderRepo.findOneBy({
        id: updateOrderitemDto.order,
      });
      if (!order) {
        throw new NotFoundException("Order topilmadi");
      }
      orderItem.order = order;
    }

    // product_id bo‘lsa, tegishli product borligini tekshiramiz
    if (updateOrderitemDto.product) {
      const product = await this.productRepo.findOneBy({
        id: updateOrderitemDto.product,
      });
      if (!product) {
        throw new NotFoundException("Product topilmadi");
      }
      orderItem.product = product;
    }

    return await this.orderitemRepo.save(orderItem);
  }

  async remove(id: number) {
    const result = await this.orderitemRepo.delete(id);
    if (!result.affected) {
      throw new NotFoundException("Orderitem topilmadi");
    }
    return { message: "Orderitem muvaffaqiyatli o'chirildi" };
  }
}
