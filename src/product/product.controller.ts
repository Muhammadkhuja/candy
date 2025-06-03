import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { AdminGuard } from "../common/guards/admin.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { UserGuard } from "../common/guards/user.guard";

@ApiTags("Mahsulotlar")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi mahsulot yaratish" })
  @ApiResponse({
    status: 201,
    description: "Mahsulot muvaffaqiyatli yaratildi",
  })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha mahsulotlarni olish" })
  @ApiResponse({ status: 200, description: "Mahsulotlar ro'yxati" })
  findAll() {
    return this.productService.findAll();
  }
  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Bitta mahsulotni olish" })
  @ApiResponse({ status: 200, description: "Mahsulot topildi" })
  @ApiResponse({ status: 404, description: "Mahsulot topilmadi" })
  @ApiParam({
    name: "id",
    type: Number,
    example: 1,
    description: "Mahsulot ID raqami",
  })
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Mahsulotni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Mahsulot muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Mahsulot topilmadi" })
  @ApiParam({
    name: "id",
    type: Number,
    example: 1,
    description: "Mahsulot ID raqami",
  })
  @ApiBody({ type: UpdateProductDto })
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Mahsulotni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Mahsulot muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({ status: 404, description: "Mahsulot topilmadi" })
  @ApiParam({
    name: "id",
    type: Number,
    example: 1,
    description: "Mahsulot ID raqami",
  })
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
