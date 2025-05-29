import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Category } from "../category/entities/category.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) {}

  async create(createProductDto: CreateProductDto) {
    // category_id tekshirish
    const category = await this.categoryRepo.findOneBy({
      id: createProductDto.category_id,
    });
    if (!category) {
      throw new NotFoundException("Category topilmadi");
    }

    // productni saqlash
    const product = this.productRepo.create({
      ...createProductDto,
      category_id: category, // shu yerda id yoki category entity kiritishingiz mumkin
    });
    return this.productRepo.save(product);
  }

  async findAll() {
    // category bilan join qilib barcha mahsulotlarni olish
    return this.productRepo.find({ relations: ["category_id"] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ["category_id"],
    });
    if (!product) {
      throw new NotFoundException("Product topilmadi");
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ["category_id"],
    });

    if (!product) {
      throw new NotFoundException("Product topilmadi");
    }

    Object.assign(product, updateProductDto);

    if (updateProductDto.category_id) {
      const category = await this.categoryRepo.findOneBy({
        id: updateProductDto.category_id,
      });
      if (!category) {
        throw new NotFoundException("Category topilmadi");
      }
      product.category_id = category;
    }

    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const result = await this.productRepo.delete(id);
    if (!result.affected) {
      throw new NotFoundException("Product topilmadi");
    }
    return { message: "Product muvaffaqiyatli o'chirildi" };
  }
}
