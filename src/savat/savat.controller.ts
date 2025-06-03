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
import { SavatService } from "./savat.service";
import { CreateSavatDto } from "./dto/create-savat.dto";
import { UpdateSavatDto } from "./dto/update-savat.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserGuard } from "../common/guards/user.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { SelfUserGuard } from "../common/guards/selfuser.guard";

@ApiTags("Savat")
@Controller("savat")
export class SavatController {
  constructor(private readonly savatService: SavatService) {}

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi savat elementi yaratish" })
  @ApiResponse({ status: 201, description: "Savat elementi yaratildi." })
  @ApiResponse({ status: 400, description: "Noto'g'ri malumotlar." })
  create(@Body() createSavatDto: CreateSavatDto) {
    return this.savatService.create(createSavatDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha savat elementlarini olish" })
  @ApiResponse({ status: 200, description: "Savat elementlari ro'yxati." })
  findAll() {
    return this.savatService.findAll();
  }

  @UseGuards(SelfUserGuard)
  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha savat elementini olish" })
  @ApiResponse({ status: 200, description: "Topilgan savat elementi." })
  @ApiResponse({ status: 404, description: "Savat elementi topilmadi." })
  findOne(@Param("id") id: string) {
    return this.savatService.findOne(+id);
  }

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
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

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Savat elementini o'chirish" })
  @ApiResponse({ status: 200, description: "Savat elementi o'chirildi." })
  @ApiResponse({ status: 404, description: "Savat elementi topilmadi." })
  remove(@Param("id") id: string) {
    return this.savatService.remove(+id);
  }
}

