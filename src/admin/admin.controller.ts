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
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UpdateAdminPasswordDto } from "./dto/update-password.dto";
import { SelfAdminGuard } from "../common/guards/selfadmin.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { SuperadminGuard } from "../common/guards/super-admin.guard";
import { AdminGuard } from "../common/guards/admin.guard";

@ApiTags("Admin-Administratorlar")
@ApiBearerAuth("access-token")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @UseGuards(SuperadminGuard)
  // @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Admin qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Admin muvaffaqiyatli yaratildi",
    type: CreateAdminDto,
  })
  @ApiResponse({ status: 400, description: "Yaratuvchi xato", type: String })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Admin olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha adminlar muvaffaqiyatli olindi",
    type: [CreateAdminDto],
  })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(SelfAdminGuard)
  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Id bo'yicha Admin olish" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli topildi",
    type: CreateAdminDto,
  })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(SelfAdminGuard)
  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Adminni taxrirlash" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli yangilandi",
    type: UpdateAdminDto,
  })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(SuperadminGuard)
  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli o'chirildi",
    type: Number,
  })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }

  @UseGuards(SelfAdminGuard)
  @UseGuards(AuthGuard)
  @Patch(":id/password")
  async updatePassword(
    @Param("id") id: number,
    @Body() dto: UpdateAdminPasswordDto
  ): Promise<{ message: string }> {
    const result = await this.adminService.updatePassword(id, dto);
    return { message: result };
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.adminService.activateAdmin(link);
  }
}
