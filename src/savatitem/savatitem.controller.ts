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
import { SavatitemService } from "./savatitem.service";
import { CreateSavatitemDto } from "./dto/create-savatitem.dto";
import { UpdateSavatitemDto } from "./dto/update-savatitem.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { UserGuard } from "../common/guards/user.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { SelfUserGuard } from "../common/guards/selfuser.guard";

@ApiTags("Savatitem")
@Controller("savatitem")
export class SavatitemController {
  constructor(private readonly savatitemService: SavatitemService) {}

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi savat itemini yaratish" })
  @ApiResponse({ status: 201, description: "Savat itemi yaratildi." })
  @ApiResponse({ status: 400, description: "Noto'g'ri malumot." })
  create(@Body() createSavatitemDto: CreateSavatitemDto) {
    return this.savatitemService.create(createSavatitemDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha savat itemlarini olish" })
  @ApiResponse({ status: 200, description: "Savat itemlari ro'yxati." })
  findAll() {
    return this.savatitemService.findAll();
  }

  @UseGuards(SelfUserGuard)
  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bitta savat itemini olish" })
  @ApiResponse({ status: 200, description: "Topilgan savat itemi." })
  @ApiResponse({ status: 404, description: "Savat itemi topilmadi." })
  findOne(@Param("id") id: string) {
    return this.savatitemService.findOne(+id);
  }

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Savat itemini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Savat itemi muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Noto'g'ri malumot." })
  @ApiResponse({ status: 404, description: "Savat itemi topilmadi." })
  update(
    @Param("id") id: string,
    @Body() updateSavatitemDto: UpdateSavatitemDto
  ) {
    return this.savatitemService.update(+id, updateSavatitemDto);
  }

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Savat itemini o'chirish" })
  @ApiResponse({ status: 200, description: "Savat itemi o'chirildi." })
  @ApiResponse({ status: 404, description: "Savat itemi topilmadi." })
  remove(@Param("id") id: string) {
    return this.savatitemService.remove(+id);
  }
}
