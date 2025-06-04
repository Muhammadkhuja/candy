import { Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SingInDto } from './dto/sing-in.dto';
import { Request, Response } from 'express';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Mutation("admin-sing-up")
  async singUpAdmin(@Body() cretaeAdminDto: CreateAdminDto) {
    return this.authService.singUpAdmin(cretaeAdminDto);
  }

  @Mutation("admin-sing-in")
  async singInAdmin(
    @Args() singInDto: SingInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singInAdmin(singInDto, res);
  }

  @Mutation("admin-sing-out")
  async singOutAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.singOutAdmin(req.cookies.admin_refresh_token, res);
  }

  @Mutation("admin-refresh")
  async AdminrefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.AdminrefreshToken(req, res);
  }

}
