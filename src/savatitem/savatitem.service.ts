import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSavatitemDto } from "./dto/create-savatitem.dto";
import { UpdateSavatitemDto } from "./dto/update-savatitem.dto";
import { Savat } from "../savat/entities/savat.entity";
import { Product } from "../product/entities/product.entity";
import { SavatItem } from "./entities/savatitem.entity";

@Injectable()
export class SavatitemService {
  constructor(
    @InjectRepository(SavatItem)
    private readonly savatitemRepo: Repository<SavatItem>,
    @InjectRepository(Savat)
    private readonly savatRepo: Repository<Savat>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}

  async create(createSavatitemDto: CreateSavatitemDto) {
    const savat = await this.savatRepo.findOne({
      where: { id: createSavatitemDto.savat_id },
    });
    if (!savat) {
      throw new NotFoundException("Savat topilmadi");
    }

    const product = await this.productRepo.findOne({
      where: { id: createSavatitemDto.product_id },
    });
    if (!product) {
      throw new NotFoundException("Mahsulot topilmadi");
    }

    const savatitem = this.savatitemRepo.create({
      quantity: createSavatitemDto.quantity,
      savat_id: savat,
      product_id: product,
      unit_price: createSavatitemDto.unit_price
    });

    return this.savatitemRepo.save(savatitem);
  }

  async findAll() {
    return this.savatitemRepo.find({
      relations: ["savat_id", "product_id"],
    });
  }

  async findOne(id: number) {
    const item = await this.savatitemRepo.findOne({
      where: { id },
      relations: ["savat_id", "product_id"],
    });

    if (!item) {
      throw new NotFoundException("SavatItem topilmadi");
    }

    return item;
  }

  async update(id: number, updateSavatitemDto: UpdateSavatitemDto) {
    const savatitem = await this.savatitemRepo.findOne({
      where: { id },
      relations: ["savat_id", "product_id"],
    });

    if (!savatitem) {
      throw new NotFoundException("SavatItem topilmadi");
    }

    Object.assign(savatitem, updateSavatitemDto);

    if (updateSavatitemDto.savat_id) {
      const savat = await this.savatRepo.findOneBy({
        id: updateSavatitemDto.savat_id,
      });
      if (!savat) {
        throw new NotFoundException("Savat topilmadi");
      }
      savatitem.savat_id = savat;
    }

    if (updateSavatitemDto.product_id) {
      const product = await this.productRepo.findOneBy({
        id: updateSavatitemDto.product_id,
      });
      if (!product) {
        throw new NotFoundException("Mahsulot topilmadi");
      }
      savatitem.product_id = product;
    }

    return this.savatitemRepo.save(savatitem);
  }

  async remove(id: number) {
    const result = await this.savatitemRepo.delete(id);
    if (!result.affected) {
      throw new NotFoundException("SavatItem topilmadi");
    }
    return { message: "SavatItem muvaffaqiyatli o'chirildi" };
  }
}
