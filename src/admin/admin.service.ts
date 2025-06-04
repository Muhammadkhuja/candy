import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { MailService } from "../common/mail/mail.service";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
    private readonly mailService: MailService
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, ...otherData } = createAdminDto;
    if (password != confirm_password) {
      throw new BadGatewayException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newAdmin = await this.adminRepo.save({
      ...otherData,
      hashed_password,
    });
    try {
      console.log("Sending email to:", newAdmin.email);
      // await this.mailService.sendMail(newAdmin);
      await this.mailService.sendMailAd(newAdmin);
    } catch (error) {
      console.error("SendMail error:", error);
      throw new ServiceUnavailableException("Email yuborishda xatolik");
    }
    return newAdmin;
  }

  findAll() {
    return this.adminRepo.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException("Admin topilmadi");
    }
    return admin;
  }

  async findAdminByEmail(email: string) {
    const admin = await this.adminRepo.findOne({ where: { email } });
    return admin;
  }

  async findAdminByRefresh(refresh_token: string) {
    const admins = await this.adminRepo.find();

    for (const admin of admins) {
      const match = await bcrypt.compare(refresh_token, admin.refresh_token);
      if (match) return admin;
    }

    return null;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const updateData: any = { ...updateAdminDto };

    if (updateData.password) {
      updateData.hashed_password = await bcrypt.hash(updateData.password, 7);
      delete updateData.password;
    }
    delete updateData.confirm_password;

    await this.adminRepo.update(id, updateData);

    const updatedAdmin = await this.adminRepo.findOne({ where: { id } });
    return updatedAdmin;
  }

  async remove(id: number) {
    const delet = await this.adminRepo.delete(id);
    if (!delet.affected) {
      throw new NotFoundException("Admin topilmadi");
    }
    return {
      message: "Ma'lumotlar o'chirib yuborildi",
    };
  }

  async updatePassword(
    id: number,
    dto: { oldpassword: string; newpassword: string }
  ): Promise<string> {
    const admin = await this.adminRepo.findOne({ where: { id } });

    if (!admin) throw new NotFoundException("Foydalanuvchi topilmadi");
    const isMatch = await bcrypt.compare(
      dto.oldpassword,
      admin!.hashed_password
    );
    if (!isMatch) throw new BadRequestException("Eski parol noto'g'ri");

    const hashedNewPassword = await bcrypt.hash(dto.newpassword, 7);
    admin!.hashed_password = hashedNewPassword;

    await this.adminRepo.save(admin!);

    return "Parol muvaffaqiyatli yangilandi";
  }

  async activateAdmin(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link topilmadi");
    }
    const admin = await this.adminRepo.findOne({
      where: {
        activation_link: link,
        is_active: false,
      },
    });
    if (!admin) {
      throw new BadRequestException(
        "Foydalanuvchi allaqachon faollashtrilgan yoki noto'g'ri link"
      );
    }
    admin.is_active = true;
    await this.adminRepo.save(admin);

    return {
      message: "Foydalanuvchi muvaffaqiyatli faollashtirildi",
      is_active: admin.is_active,
    };
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    await this.adminRepo.update(id, {
      refresh_token,
    });
  }
}
