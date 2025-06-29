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
import { ShippingoptionsService } from "./shippingoptions.service";
import { CreateShippingoptionDto } from "./dto/create-shippingoption.dto";
import { UpdateShippingoptionDto } from "./dto/update-shippingoption.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { UserGuard } from "../common/guards/user.guard";

@ApiTags("Shipping Options")
@Controller("shippingoptions")
export class ShippingoptionsController {
  constructor(
    private readonly shippingoptionsService: ShippingoptionsService
  ) {}

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi yetkazib berish variantini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi shipping option muvaffaqiyatli yaratildi",
  })
  create(@Body() createShippingoptionDto: CreateShippingoptionDto) {
    return this.shippingoptionsService.create(createShippingoptionDto);
  }

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha yetkazib berish variantlarini olish" })
  @ApiResponse({ status: 200, description: "Shipping optionlar roʻyxati" })
  findAll() {
    return this.shippingoptionsService.findAll();
  }

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Bitta yetkazib berish variantini olish" })
  @ApiParam({ name: "id", type: Number, description: "Shipping option IDsi" })
  @ApiResponse({ status: 200, description: "Topilgan shipping option" })
  @ApiResponse({ status: 404, description: "Shipping option topilmadi" })
  findOne(@Param("id") id: string) {
    return this.shippingoptionsService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Shipping optionni yangilash" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Yangilanadigan shipping option IDsi",
  })
  @ApiResponse({
    status: 200,
    description: "Shipping option muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Shipping option topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateShippingoptionDto: UpdateShippingoptionDto
  ) {
    return this.shippingoptionsService.update(+id, updateShippingoptionDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Shipping optionni o'chirish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "O'chiriladigan shipping option IDsi",
  })
  @ApiResponse({ status: 200, description: "Shipping option o'chirildi" })
  @ApiResponse({ status: 404, description: "Shipping option topilmadi" })
  remove(@Param("id") id: string) {
    return this.shippingoptionsService.remove(+id);
  }
}
