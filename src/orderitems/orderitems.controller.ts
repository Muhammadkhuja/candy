import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { OrderitemsService } from "./orderitems.service";
import { CreateOrderitemDto } from "./dto/create-orderitem.dto";
import { UpdateOrderitemDto } from "./dto/update-orderitem.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserGuard } from "../common/guards/user.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { SelfUserGuard } from "../common/guards/selfuser.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@ApiTags("Order Items")
@Controller("orderitems")
export class OrderitemsController {
  constructor(private readonly orderitemsService: OrderitemsService) {}

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi buyurtma elementini yaratish" })
  @ApiResponse({ status: 201, description: "Buyurtma elementi yaratildi." })
  @ApiResponse({ status: 400, description: "Yaroqsiz malumot." })
  create(@Body() createOrderitemDto: CreateOrderitemDto) {
    return this.orderitemsService.create(createOrderitemDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha buyurtma elementlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha buyurtma elementlari ro'yxati.",
  })
  findAll() {
    return this.orderitemsService.findAll();
  }

  @UseGuards(SelfUserGuard)
  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bitta buyurtma elementini olish" })
  @ApiResponse({ status: 200, description: "Topilgan buyurtma elementi." })
  @ApiResponse({ status: 404, description: "Buyurtma elementi topilmadi." })
  findOne(@Param("id") id: string) {
    return this.orderitemsService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Buyurtma elementini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Buyurtma elementi muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Yaroqsiz malumot." })
  @ApiResponse({ status: 404, description: "Buyurtma elementi topilmadi." })
  update(
    @Param("id") id: string,
    @Body() updateOrderitemDto: UpdateOrderitemDto
  ) {
    return this.orderitemsService.update(+id, updateOrderitemDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Buyurtma elementini o'chirish" })
  @ApiResponse({ status: 200, description: "Buyurtma elementi o'chirildi." })
  @ApiResponse({ status: 404, description: "Buyurtma elementi topilmadi." })
  remove(@Param("id") id: string) {
    return this.orderitemsService.remove(+id);
  }
}
