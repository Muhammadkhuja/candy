import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Savat } from "./entities/savat.entity";
import { CreateSavatDto } from "./dto/create-savat.dto";
import { UpdateSavatDto } from "./dto/update-savat.dto";
import { User } from "../user/entities/user.entity";

@Injectable()
export class SavatService {
  constructor(
    @InjectRepository(Savat)
    private readonly savatRepo: Repository<Savat>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(createSavatDto: CreateSavatDto) {
    const user = await this.userRepo.findOne({
      where: { id: createSavatDto.user_id },
    });

    if (!user) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }

    const savat = this.savatRepo.create({
      ...createSavatDto,
      user_id: user,
    });

    return this.savatRepo.save(savat);
  }

  async findAll() {
    return this.savatRepo.find({ relations: ["user_id"] });
  }

  async findOne(id: number) {
    const savat = await this.savatRepo.findOne({
      where: { id },
      relations: ["user_id"],
    });
    if (!savat) {
      throw new NotFoundException("Savat topilmadi");
    }
    return savat;
  }

  async update(id: number, updateSavatDto: UpdateSavatDto) {
    const savat = await this.savatRepo.findOne({
      where: { id },
      relations: ["user_id"],
    });

    if (!savat) {
      throw new NotFoundException("Savat topilmadi");
    }

    Object.assign(savat, updateSavatDto);

    if (updateSavatDto.user_id) {
      const user = await this.userRepo.findOneBy({
        id: updateSavatDto.user_id,
      });
      if (!user) {
        throw new NotFoundException("Foydalanuvchi topilmadi");
      }
      savat.user_id = user;
    }

    return this.savatRepo.save(savat);
  }

  async remove(id: number) {
    const result = await this.savatRepo.delete(id);
    if (!result.affected) {
      throw new NotFoundException("Savat topilmadi");
    }
    return { message: "Savat muvaffaqiyatli o'chirildi" };
  }
}
