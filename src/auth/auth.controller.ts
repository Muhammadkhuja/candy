import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { SingInDto } from "./dto/sing-in.dto";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("admin-sing-up")
  async singUpAdmin(@Body() cretaeAdminDto: CreateAdminDto) {
    return this.authService.singUpAdmin(cretaeAdminDto);
  }

  @Post("admin-sing-in")
  async singInAdmin(
    @Body() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInAdmin(singInDto, res);
  }

  @Post("admin-sing-out")
  async singOutAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singOutAdmin(req, res);
  }

  @Post("admin-refresh")
  async AdminrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.AdminrefreshToken(req, res);
  }
}
