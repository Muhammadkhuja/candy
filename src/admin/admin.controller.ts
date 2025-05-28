import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

@ApiTags("Admin-Administratorlar")
@ApiBearerAuth("access-token")
@Controller("admin")
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) {}

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

  @Get()
  @ApiOperation({ summary: "Admin olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha adminlar muvaffaqiyatli olindi",
    type: [CreateAdminDto],
  })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @Get(":id")
  @ApiOperation({ summary: "Admin olish" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli topildi",
    type: CreateAdminDto,
  })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Adminni taxrirlash" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli yangilandi",
    type: UpdateAdminDto,
  })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli o'chirildi",
    type: String,
  })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }

  @Patch(":id/password")
  async updatePassword(
    @Param("id") id: number,
    @Body() dto: UpdateAdminPasswordDto
  ): Promise<{ message: string }> {
    const result = await this.adminService.updatePassword(id, dto);
    return { message: result };
  }
}
