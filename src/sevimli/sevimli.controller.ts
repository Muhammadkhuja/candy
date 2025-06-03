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
import { SevimliService } from "./sevimli.service";
import { CreateSevimliDto } from "./dto/create-sevimli.dto";
import { UpdateSevimliDto } from "./dto/update-sevimli.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { UserGuard } from "../common/guards/user.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@ApiTags("Sevimli")
@Controller("sevimli")
export class SevimliController {
  constructor(private readonly sevimliService: SevimliService) {}

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi sevimli element yaratish" })
  @ApiResponse({ status: 201, description: "Sevimli element yaratildi." })
  @ApiResponse({ status: 400, description: "Noto'g'ri malumotlar." })
  create(@Body() createSevimliDto: CreateSevimliDto) {
    return this.sevimliService.create(createSevimliDto);
  }

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha sevimli elementlarni olish" })
  @ApiResponse({ status: 200, description: "Sevimli elementlar ro'yxati." })
  findAll() {
    return this.sevimliService.findAll();
  }

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bitta sevimli elementni olish" })
  @ApiResponse({ status: 200, description: "Topilgan sevimli element." })
  @ApiResponse({ status: 404, description: "Sevimli element topilmadi." })
  findOne(@Param("id") id: string) {
    return this.sevimliService.findOne(+id);
  }
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Sevimli elementni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Sevimli element muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Noto'g'ri malumotlar." })
  @ApiResponse({ status: 404, description: "Sevimli element topilmadi." })
  update(@Param("id") id: string, @Body() updateSevimliDto: UpdateSevimliDto) {
    return this.sevimliService.update(+id, updateSevimliDto);
  }

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Sevimli elementni o'chirish" })
  @ApiResponse({ status: 200, description: "Sevimli element o'chirildi." })
  @ApiResponse({ status: 404, description: "Sevimli element topilmadi." })
  remove(@Param("id") id: string) {
    return this.sevimliService.remove(+id);
  }
}
