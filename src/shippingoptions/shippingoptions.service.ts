import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateShippingoptionDto } from "./dto/create-shippingoption.dto";
import { UpdateShippingoptionDto } from "./dto/update-shippingoption.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Shippingoption } from "./entities/shippingoption.entity";

@Injectable()
export class ShippingoptionsService {
  constructor(
    @InjectRepository(Shippingoption)
    private readonly shippingRepo: Repository<Shippingoption>
  ) {}

  async create(createShippingoptionDto: CreateShippingoptionDto) {
    return this.shippingRepo.save(createShippingoptionDto);
  }

  async findAll() {
    return await this.shippingRepo.find();
  }

  async findOne(id: number) {
    const shipping = await this.shippingRepo.findOneBy({ id });
    if (!shipping) {
      throw new NotFoundException("shipping option topilmadi");
    }
    return shipping;
  }

  async update(id: number, updateShippingoptionDto: UpdateShippingoptionDto) {
    const update = await this.shippingRepo.update(id, updateShippingoptionDto);
    if (!update.affected) {
      throw new NotFoundException("shipping option topilmadi");
    }
    return this.shippingRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const delet = await this.shippingRepo.delete(id);
    if (!delet.affected) {
      throw new NotFoundException("shipping option topilmadi");
    }
    return { message: `${id}-id shipping option muvaffaqiyatli o'chirildi` };
  }
}
