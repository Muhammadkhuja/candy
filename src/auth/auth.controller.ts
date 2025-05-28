import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { SingInDto } from "./dto/sing-in.dto";
import { Request, Response } from "express";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateUserDto } from "../user/dto/create-user.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("admin-sing-up")
  @ApiOperation({ summary: "Admin ro'yxatdan o'tkazish" })
  @ApiResponse({
    status: 201,
    description: "Admin muvaffaqiyatli ro'yxatdan o'tdi",
  })
  @ApiResponse({ status: 400, description: "Xatolik: noto'g'ri malumot" })
  async singUpAdmin(@Body() cretaeAdminDto: CreateAdminDto) {
    return this.authService.singUpAdmin(cretaeAdminDto);
  }

  @Post("admin-sing-in")
  @ApiOperation({ summary: "Admin tizimga kirishi" })
  @ApiResponse({
    status: 201,
    description: "Admin muvaffaqiyatli tizimga kirdi",
  })
  @ApiResponse({ status: 401, description: "Login yoki parol noto'g'ri" })
  async singInAdmin(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInAdmin(singInDto, res);
  }

  @Post("admin-sing-out")
  @ApiOperation({ summary: "Admin tizimdan chiqishi" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli tizimdan chiqdi",
  })
  async singOutAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singOutAdmin(req, res);
  }

  @Post("admin-refresh")
  @ApiOperation({ summary: "Admin refresh token orqali kirishni yangilash" })
  @ApiResponse({ status: 200, description: "Token muvaffaqiyatli yangilandi" })
  @ApiResponse({
    status: 403,
    description: "Refresh token noto'g'ri yoki muddati tugagan",
  })
  async AdminrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.AdminrefreshToken(req, res);
  }

  //-------------------------------------------------------------------------------------------------

  @Post("user-sing-up")
  @ApiOperation({ summary: "User ro'yxatdan o'tkazish" })
  @ApiResponse({
    status: 201,
    description: "User muvaffaqiyatli ro'yxatdan o'tdi",
  })
  @ApiResponse({ status: 400, description: "Xatolik: noto'g'ri malumot" })
  async singUpUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.singUpUser(createUserDto);
  }

  @Post("user-sing-in")
  @ApiOperation({ summary: "User tizimga kirishi" })
  @ApiResponse({
    status: 201,
    description: "User muvaffaqiyatli tizimga kirdi",
  })
  @ApiResponse({ status: 401, description: "Login yoki parol noto'g'ri" })
  async singInUser(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInUser(singInDto, res);
  }

  @Post("user-sing-out")
  @ApiOperation({ summary: "User tizimdan chiqishi" })
  @ApiResponse({
    status: 200,
    description: "User muvaffaqiyatli tizimdan chiqdi",
  })
  async singOutUser(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singOutUser(req, res);
  }

  @Post("user-refresh")
  @ApiOperation({ summary: "User refresh token orqali kirishni yangilash" })
  @ApiResponse({ status: 200, description: "Token muvaffaqiyatli yangilandi" })
  @ApiResponse({
    status: 403,
    description: "Refresh token noto'g'ri yoki muddati tugagan",
  })
  async userRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.UserrefreshToken(req, res);
  }
}
