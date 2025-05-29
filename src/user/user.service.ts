import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Card } from "../cards/entities/card.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password, ...otherData } = createUserDto;

    if (password !== confirm_password) {
      throw new BadGatewayException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(password, 7);

    return this.userRepo.save({
      ...otherData,
      hashed_password,
    });
  }

  async findAll() {
    const hello = await this.userRepo.find({ relations: ["cards"] });  
    console.log(hello);
    return hello;
      
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    return user;
  }

  async findUserByRefresh(refresh_token: string) {
    const users = await this.userRepo.find();

    for (const user of users) {
      const match = await bcrypt.compare(refresh_token, user.refresh_token);
      if (match) return user;
    }

    return null;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateData: any = { ...updateUserDto };

    if (updateData.password) {
      updateData.hashed_password = await bcrypt.hash(updateData.password, 7);
      delete updateData.password;
    }
    delete updateData.confirm_password;

    await this.userRepo.update(id, updateData);

    const updatedUser = await this.userRepo.findOne({ where: { id } });
    return updatedUser;
  }

  async remove(id: number) {
    const deleted = await this.userRepo.delete(id);
    if (!deleted.affected) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }
    return {
      message: "Ma'lumotlar o'chirib yuborildi",
    };
  }

  async updatePassword(
    id: number,
    dto: { oldpassword: string; newpassword: string }
  ): Promise<string> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) throw new NotFoundException("Foydalanuvchi topilmadi");

    const isMatch = await bcrypt.compare(dto.oldpassword, user.hashed_password);
    if (!isMatch) throw new BadRequestException("Eski parol noto'g'ri");

    const hashedNewPassword = await bcrypt.hash(dto.newpassword, 7);
    user.hashed_password = hashedNewPassword;

    await this.userRepo.save(user);

    return "Parol muvaffaqiyatli yangilandi";
  }
}
