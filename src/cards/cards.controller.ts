import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Karta - Cards")
@Controller("cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi karta qo'shish" })
  @ApiResponse({ status: 201, description: "Karta yaratildi" })
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

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

  @Delete(":id")
  @ApiOperation({ summary: "Kartani o'chirish" })
  @ApiResponse({ status: 200, description: "Karta o'chirildi", type: Number })
  @ApiResponse({ status: 404, description: "Karta topilmadi" })
  remove(@Param("id") id: string) {
    return this.cardsService.remove(+id);
  }
}
