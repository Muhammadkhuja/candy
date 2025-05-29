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

import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";

@ApiTags("Category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: "Yangi kategoriya yaratish" })
  @ApiCreatedResponse({
    description: "Kategoriya muvaffaqiyatli yaratildi",
    type: Category,
  })
  @ApiBadRequestResponse({
    description: "Yaratishda xatolik: noto'g'ri malumot",
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha kategoriyalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Kategoriyalar ro'yxati",
    type: [Category],
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Kategoriya ID orqali topish" })
  @ApiResponse({
    status: 200,
    description: "Kategoriya topildi",
    type: Category,
  })
  @ApiNotFoundResponse({ description: "Kategoriya topilmadi" })
  @ApiBadRequestResponse({ description: "Noto'g'ri ID format" })
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Kategoriya yangilash" })
  @ApiResponse({
    status: 200,
    description: "Kategoriya yangilandi",
    type: Category,
  })
  @ApiBadRequestResponse({ description: "Yangilashda xatolik" })
  @ApiNotFoundResponse({ description: "Kategoriya topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Kategoriya o'chirish" })
  @ApiResponse({ status: 200, description: "Kategoriya o'chirildi" })
  @ApiNotFoundResponse({ description: "Kategoriya topilmadi" })
  remove(@Param("id") id: string) {
    return this.categoryService.remove(+id);
  }
}
