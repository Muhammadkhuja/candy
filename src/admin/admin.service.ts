import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, ...otherData } = createAdminDto;
    if (password != confirm_password) {
      throw new BadGatewayException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.adminRepo.save({
      ...otherData,
      hashed_password,
    });
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
    if (!delet) {
      throw new NotFoundException("Admin topilmadi");
    }
    return {
      message: "Ma'lumotlar o'chirib yuborildi",
    };
  }

  async updatePassword(
    id: number,
    dto: { oldpassword: string, newpassword: string},
  ): Promise<string> {
    const admin = await this.adminRepo.findOne({where: {id}})
    
    if(!admin) throw new NotFoundException("Foydalanuvchi topilmadi")
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
}
