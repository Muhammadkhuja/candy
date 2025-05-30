import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
} from "@nestjs/swagger";

import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";

@ApiTags("Order")
@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: "Yangi buyurtma yaratish" })
  @ApiCreatedResponse({
    description: "Buyurtma muvaffaqiyatli yaratildi",
    type: Order,
  })
  @ApiBadRequestResponse({
    description: "Yaratishda xatolik: noto'g'ri ma'lumot",
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha buyurtmalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Buyurtmalar ro'yxati",
    type: [Order],
  })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Buyurtmani ID orqali topish" })
  @ApiResponse({
    status: 200,
    description: "Buyurtma topildi",
    type: Order,
  })
  @ApiNotFoundResponse({ description: "Buyurtma topilmadi" })
  @ApiBadRequestResponse({ description: "Noto'g'ri ID format" })
  findOne(@Param("id") id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Buyurtmani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Buyurtma yangilandi",
    type: Order,
  })
  @ApiBadRequestResponse({ description: "Yangilashda xatolik" })
  @ApiNotFoundResponse({ description: "Buyurtma topilmadi" })
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Buyurtmani o'chirish" })
  @ApiResponse({ status: 200, description: "Buyurtma o'chirildi" })
  @ApiNotFoundResponse({ description: "Buyurtma topilmadi" })
  remove(@Param("id") id: string) {
    return this.orderService.remove(+id);
  }
}
