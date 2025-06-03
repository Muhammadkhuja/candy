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
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "../common/decorators/rolesauth.decorator";
import { UserGuard } from "../common/guards/user.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@ApiTags("Reviews")
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi review (fikr) yaratish" })
  @ApiResponse({ status: 201, description: "Review yaratildi." })
  @ApiResponse({ status: 400, description: "Noto'g'ri malumot." })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha review (fikr)larni olish" })
  @ApiResponse({ status: 200, description: "Reviewlar ro'yxati." })
  findAll() {
    return this.reviewsService.findAll();
  }

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha bitta review (fikr)ni olish" })
  @ApiResponse({ status: 200, description: "Topilgan review." })
  @ApiResponse({ status: 404, description: "Review topilmadi." })
  findOne(@Param("id") id: string) {
    return this.reviewsService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Reviewni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Review muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Noto'g'ri malumot." })
  @ApiResponse({ status: 404, description: "Review topilmadi." })
  update(@Param("id") id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Reviewni o'chirish" })
  @ApiResponse({ status: 200, description: "Review o'chirildi." })
  @ApiResponse({ status: 404, description: "Review topilmadi." })
  remove(@Param("id") id: string) {
    return this.reviewsService.remove(+id);
  }
}
