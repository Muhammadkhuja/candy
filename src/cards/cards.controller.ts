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
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { UserGuard } from "../common/guards/user.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { Roles } from "../common/decorators/rolesauth.decorator";
import { JwtRolesGuard } from "../common/guards/roles.guard";

@ApiTags("Karta - Cards")
@Controller("cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi karta qo'shish" })
  @ApiResponse({ status: 201, description: "Karta yaratildi" })
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha kartalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Kartalar ro'yxati",
    type: [CreateCardDto],
  })
  @ApiResponse({ status: 404, description: "Karta topilmadi" })
  findAll() {
    return this.cardsService.findAll();
  }

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha kartani olish" })
  @ApiResponse({
    status: 200,
    description: "Karta topildi",
    type: CreateCardDto,
  })
  @ApiResponse({ status: 404, description: "Karta topilmadi" })
  findOne(@Param("id") id: string) {
    return this.cardsService.findOne(+id);
  }

  @Roles("admin", "user")
  @UseGuards(JwtRolesGuard)
  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Kartani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Karta yangilandi",
    type: CreateCardDto,
  })
  @ApiResponse({ status: 404, description: "Karta topilmadi" })
  update(@Param("id") id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Kartani o'chirish" })
  @ApiResponse({ status: 200, description: "Karta o'chirildi", type: Number })
  @ApiResponse({ status: 404, description: "Karta topilmadi" })
  remove(@Param("id") id: string) {
    return this.cardsService.remove(+id);
  }
}
