import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sevimli } from "./entities/sevimli.entity";
import { CreateSevimliDto } from "./dto/create-sevimli.dto";
import { UpdateSevimliDto } from "./dto/update-sevimli.dto";
import { User } from "../user/entities/user.entity";
import { Product } from "../product/entities/product.entity";

@Injectable()
export class SevimliService {
  constructor(
    @InjectRepository(Sevimli)
    private readonly sevimliRepo: Repository<Sevimli>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}

  async create(createSevimliDto: CreateSevimliDto) {
    const user = await this.userRepo.findOneBy({
      id: createSevimliDto.user_id,
    });
    if (!user) throw new NotFoundException("Foydalanuvchi topilmadi");

    const product = await this.productRepo.findOneBy({
      id: createSevimliDto.product_id,
    });
    if (!product) throw new NotFoundException("Mahsulot topilmadi");

    const sevimli = this.sevimliRepo.create({
      user_id: user,
      product_id: product,
      created_at: new Date(),
    });

    return this.sevimliRepo.save(sevimli);
  }

  async findAll() {
    return this.sevimliRepo.find({
      relations: ["user_id", "product_id"],
    });
  }

  async findOne(id: number) {
    const sevimli = await this.sevimliRepo.findOne({
      where: { id },
      relations: ["user_id", "product_id"],
    });
    if (!sevimli) throw new NotFoundException("Sevimli topilmadi");
    return sevimli;
  }

  async update(id: number, updateSevimliDto: UpdateSevimliDto) {
    const sevimli = await this.sevimliRepo.findOne({
      where: { id },
      relations: ["user_id", "product_id"],
    });

    if (!sevimli) throw new NotFoundException("Sevimli topilmadi");

    if (updateSevimliDto.user_id) {
      const user = await this.userRepo.findOneBy({
        id: updateSevimliDto.user_id,
      });
      if (!user) throw new NotFoundException("Foydalanuvchi topilmadi");
      sevimli.user_id = user;
    }

    if (updateSevimliDto.product_id) {
      const product = await this.productRepo.findOneBy({
        id: updateSevimliDto.product_id,
      });
      if (!product) throw new NotFoundException("Mahsulot topilmadi");
      sevimli.product_id = product;
    }

    return this.sevimliRepo.save(sevimli);
  }

  async remove(id: number) {
    const result = await this.sevimliRepo.delete(id);
    if (!result.affected) throw new NotFoundException("Sevimli topilmadi");
    return { message: "Sevimli muvaffaqiyatli o'chirildi" };
  }
}
