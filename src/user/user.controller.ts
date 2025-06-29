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
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UpdateAdminPasswordDto } from "../admin/dto/update-password.dto";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { UserGuard } from "../common/guards/user.guard";
import { JwtRolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/rolesauth.decorator";
import { SelfUserGuard } from "../common/guards/selfuser.guard";

@ApiTags("Foydalanuvchilar - User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "Yangi foydalanuvchi yaratish" })
  @ApiResponse({ status: 201, description: "Foydalanuvchi yaratildi" })
  @ApiResponse({ status: 400, description: "Xatolik: noto'g'ri malumot" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha foydalanuvchilarni olish" })
  @ApiResponse({ status: 200, description: "Foydalanuvchilar ro'yxati" })
  findAll() {
    return this.userService.findAll();
  }

  // @UseGuards(SelfUserGuard)
  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID orqali foydalanuvchini olish" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi topildi" })
  @ApiResponse({ status: 404, description: "Foydalanuvchi topilmadi" })
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  // @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Foydalanuvchini yangilash" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi yangilandi" })
  @ApiResponse({ status: 404, description: "Foydalanuvchi topilmadi" })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Foydalanuvchini o'chirish" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi o'chirildi" })
  @ApiResponse({ status: 404, description: "Foydalanuvchi topilmadi" })
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }

  @Patch(":id/password")
  async updatePassword(
    @Param("id") id: number,
    @Body() dto: UpdateAdminPasswordDto
  ): Promise<{ message: string }> {
    const result = await this.userService.updatePassword(id, dto);
    return { message: result };
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.userService.activateUser(link);
  }
}
