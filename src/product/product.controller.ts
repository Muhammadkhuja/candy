import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

@ApiTags("Mahsulotlar")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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

  @Get()
  @ApiOperation({ summary: "Barcha mahsulotlarni olish" })
  @ApiResponse({ status: 200, description: "Mahsulotlar ro‘yxati" })
  findAll() {
    return this.productService.findAll();
  }

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

  @Delete(":id")
  @ApiOperation({ summary: "Mahsulotni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Mahsulot muvaffaqiyatli o‘chirildi",
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
