import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SavatService } from "./savat.service";
import { CreateSavatDto } from "./dto/create-savat.dto";
import { UpdateSavatDto } from "./dto/update-savat.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Savat")
@Controller("savat")
export class SavatController {
  constructor(private readonly savatService: SavatService) {}

  @Post()
  @ApiOperation({ summary: "Yangi savat elementi yaratish" })
  @ApiResponse({ status: 201, description: "Savat elementi yaratildi." })
  @ApiResponse({ status: 400, description: "Noto'g'ri malumotlar." })
  create(@Body() createSavatDto: CreateSavatDto) {
    return this.savatService.create(createSavatDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha savat elementlarini olish" })
  @ApiResponse({ status: 200, description: "Savat elementlari ro'yxati." })
  findAll() {
    return this.savatService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha savat elementini olish" })
  @ApiResponse({ status: 200, description: "Topilgan savat elementi." })
  @ApiResponse({ status: 404, description: "Savat elementi topilmadi." })
  findOne(@Param("id") id: string) {
    return this.savatService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Savat elementini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Savat elementi muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Noto'g'ri malumotlar." })
  @ApiResponse({ status: 404, description: "Savat elementi topilmadi." })
  update(@Param("id") id: string, @Body() updateSavatDto: UpdateSavatDto) {
    return this.savatService.update(+id, updateSavatDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Savat elementini o'chirish" })
  @ApiResponse({ status: 200, description: "Savat elementi o'chirildi." })
  @ApiResponse({ status: 404, description: "Savat elementi topilmadi." })
  remove(@Param("id") id: string) {
    return this.savatService.remove(+id);
  }
}
