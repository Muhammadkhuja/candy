import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Card } from "./entities/card.entity";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { User } from "../user/entities/user.entity";

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepo: Repository<Card>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(createCardDto: CreateCardDto) {
    return this.cardRepo.save(createCardDto);
  }

  async findAll() {
    return await this.cardRepo.find();
  }

  async findOne(id: number) {
    const card = await this.cardRepo.findOneBy({ id });
    if (!card) {
      throw new NotFoundException("Karta topilmadi");
    }
    return card;
  }

  // async update(id: number, updateCardDto: UpdateCardDto) {
  //   const update = await this.cardRepo.update(id, updateCardDto.user_id!);
  //   if (!update) {
  //     throw new NotFoundException("Karta topilmadi");
  //   }
  //   return update;
  // }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const card = await this.cardRepo.findOne({
      where: { id },
      relations: ["user_id"],
    });

    if (!card) {
      throw new NotFoundException("Karta topilmadi");
    }
    Object.assign(card, updateCardDto);

    if (updateCardDto.user_id) {
      const user = await this.userRepo.findOneBy({ id: updateCardDto.user_id });
      if (!user) {
        throw new NotFoundException("Foydalanuvchi topilmadi");
      }
      card.user_id = user;
    }

    return await this.cardRepo.save(card);
  }

  async remove(id: number) {
    const card = await this.cardRepo.delete(id);
    if (!card) {
      throw new NotFoundException("Karta topilmadi");
    }

    return { message: "Karta muvaffaqiyatli o'chirildi" };
  }
}
