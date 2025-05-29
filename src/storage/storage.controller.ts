import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { StorageService } from "./storage.service";
import { CreateStorageDto } from "./dto/create-storage.dto";
import { UpdateStorageDto } from "./dto/update-storage.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("Storage")
@Controller("storage")
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  @ApiOperation({ summary: "Omborga yangi mahsulot qo'shish" })
  @ApiBody({ type: CreateStorageDto })
  @ApiResponse({ status: 201, description: "Yangi ombor elementi yaratildi" })
  create(@Body() createStorageDto: CreateStorageDto) {
    return this.storageService.create(createStorageDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha ombor malumotlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha saqlangan ombor elementlari",
  })
  findAll() {
    return this.storageService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta ombor elementini olish (ID bo'yicha)" })
  @ApiResponse({ status: 200, description: "Topilgan ombor elementi" })
  @ApiResponse({ status: 404, description: "Element topilmadi" })
  findOne(@Param("id") id: string) {
    return this.storageService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Ombor elementini tahrirlash (ID bo'yicha)" })
  @ApiBody({ type: UpdateStorageDto })
  @ApiResponse({ status: 200, description: "Yangilangan element" })
  @ApiResponse({ status: 404, description: "Element topilmadi" })
  update(@Param("id") id: string, @Body() updateStorageDto: UpdateStorageDto) {
    return this.storageService.update(+id, updateStorageDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Ombor elementini o'chirish (ID bo'yicha)" })
  @ApiResponse({
    status: 200,
    description: "Element muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({ status: 404, description: "Element topilmadi" })
  remove(@Param("id") id: string) {
    return this.storageService.remove(+id);
  }
}
