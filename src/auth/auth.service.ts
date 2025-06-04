import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { Admin } from "../admin/entities/admin.entity";
import { JwtService } from "@nestjs/jwt";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import * as bcrypt from "bcrypt";
import { SingInDto } from "./dto/sing-in.dto";
import { Request, Response } from "express";
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  async AdmingenerateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      role: admin.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  //-------------------------------------------------------------------------------------------------

  async UsergenerateToken(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      role: user.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  //-------------------------------------------------------------------------------------------------

  async singUpAdmin(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findAdminByEmail(
      createAdminDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }
    const newAdmin = await this.adminService.create(createAdminDto);
    return { message: "Foydalanuvchi qo'shildi", adminId: newAdmin.id };
  }

  async singInAdmin(singInDto: SingInDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(singInDto.email);

    if (!admin?.is_active) {
      throw new BadRequestException("Oldin activatsiyadan o'ting !");
    }
    if (!admin) {
      throw new BadRequestException("Email yoki password hato");
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      admin.hashed_password
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki passwor hato p ");
    }
    const tokens = await this.AdmingenerateToken(admin);
    res.cookie("admin_refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    try {
      const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      admin.refresh_token = hashed_refresh_token;
      await this.adminService.update(admin.id, admin);
    } catch (error) {
      console.log("Token da xatolik !?!");
    }

    return {
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accessToken,
    };
  }

  // async singOutAdmin(req: Request, res: Response) {
  //   // const refresh_token = req.cookies.admin_refresh_token;
  //   const refresh_token = req.cookies["admin_refresh_token"];
  //   console.log(refresh_token);

  //   // const admin = await this.adminService.findAdminByRefresh(refresh_token);

  //   // if (!admin) {
  //   //   throw new BadGatewayException("Token yoq yoki noto'g'ri");
  //   // }
  //   const hashed_refresh_token = "";
  //   await this.adminService.update(id, admin);

  //   res.clearCookie("admin_refresh_token");

  //   return { message: "Siz endi yo'q siz !?" };
  // }

  async singOutAdmin(refresh_token: string, res: Response) {
    const userData = this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("Token yoq yoki noto'g'ri");
    }

    const hashed_refresh_token = " ";
    await this.adminService.updateRefreshToken(
      userData.id,
      hashed_refresh_token!
    );

    res.clearCookie("admin_refresh_token");

    return { message: "Siz endi yo'q siz !?" };
  }

  async AdminrefreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies["admin_refresh_token"];
    if (!refresh_token) {
      throw new ForbiddenException("Refresh token yo'q");
    }

    const admins = await this.adminService.findAll();
    const admin = admins.find(
      (admin) =>
        admin.refresh_token &&
        bcrypt.compareSync(refresh_token, admin.refresh_token)
    );

    if (!admin) {
      throw new ForbiddenException("Refresh token noto'g'ri");
    }

    const tokens = await this.AdmingenerateToken(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    admin.refresh_token = hashed_refresh_token;
    await this.adminService.update(admin.id, admin);

    res.cookie("admin_refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Token refresh token ga o'zgardi ",
      accessToken: tokens.accessToken,
    };
  }

  //-------------------------------------------------------------------------------------------------

  async singUpUser(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(
      createUserDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }
    const newUser = await this.userService.create(createUserDto);
    return { message: "Foydalanuvchi qo'shildi", userId: newUser.id };
  }

  async singInUser(singInDto: SingInDto, res: Response) {
    const user = await this.userService.findUserByEmail(singInDto.email);

    if (!user?.is_active) {
      throw new BadRequestException("Oldin activatsiyadan o'ting !");
    }
    if (!user) {
      throw new BadRequestException("Email yoki password hato");
    }

    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      user.hashed_password
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki password hato");
    }

    const tokens = await this.UsergenerateToken(user);

    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    try {
      const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      user.refresh_token = hashed_refresh_token;
      await this.userService.update(user.id, user);
    } catch (error) {
      console.log("Token da xatolik !?!");
    }

    return {
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accessToken,
    };
  }

  // async singOutUser(req: Request, res: Response) {
  //   const refresh_token = req.cookies.refresh_token;

  //   const user = await this.userService.findUserByRefresh(refresh_token);

  //   if (!user) {
  //     throw new BadGatewayException("Token yo'q yoki noto'g'ri");
  //   }

  //   user.refresh_token = "";
  //   await this.userService.update(user.id, user);

  //   res.clearCookie("refresh_token");

  //   return { message: "Siz endi yo'q siz !?" };
  // }

  async singOutUser(refresh_token: string, res: Response) {
    const userData2 = this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData2) {
      throw new ForbiddenException("Token yoq yoki noto'g'ri");
    }
    const hashed_refresh_token = " ";
    await this.adminService.updateRefreshToken(
      userData2.id,
      hashed_refresh_token!
    );

    res.clearCookie("refresh_token");

    return { message: "Siz endi yo'q siz !?" };
  }

  async UserrefreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new ForbiddenException("Refresh token yo'q");
    }

    const users = await this.userService.findAll();
    const user = users.find(
      (user) =>
        user.refresh_token &&
        bcrypt.compareSync(refresh_token, user.refresh_token)
    );

    if (!user) {
      throw new ForbiddenException("Refresh token noto'g'ri");
    }

    const tokens = await this.UsergenerateToken(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    user.refresh_token = hashed_refresh_token;
    await this.userService.update(user.id, user);

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Token refresh token ga o'zgardi ",
      accessToken: tokens.accessToken,
    };
  }
}
