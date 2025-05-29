import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Storage } from "./entities/storage.entity";
import { CreateStorageDto } from "./dto/create-storage.dto";
import { UpdateStorageDto } from "./dto/update-storage.dto";
import { Product } from "../product/entities/product.entity";

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private readonly storageRepo: Repository<Storage>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}

  async create(createStorageDto: CreateStorageDto) {
    const product = await this.productRepo.findOneBy({
      id: createStorageDto.product_id,
    });
    if (!product) {
      throw new NotFoundException("Product topilmadi");
    }

    const storage = this.storageRepo.create({
      ...createStorageDto,
      product_id: product,
    });
    return this.storageRepo.save(storage);
  }

  async findAll() {
    return this.storageRepo.find({ relations: ["product_id"] });
  }

  async findOne(id: number) {
    const storage = await this.storageRepo.findOne({
      where: { id },
      relations: ["product_id"],
    });
    if (!storage) {
      throw new NotFoundException("Storage topilmadi");
    }
    return storage;
  }

  async update(id: number, updateStorageDto: UpdateStorageDto) {
    const storage = await this.storageRepo.findOne({
      where: { id },
      relations: ["product_id"],
    });

    if (!storage) {
      throw new NotFoundException("Storage topilmadi");
    }

    Object.assign(storage, updateStorageDto);

    if (updateStorageDto.product_id) {
      const product = await this.productRepo.findOneBy({
        id: updateStorageDto.product_id,
      });
      if (!product) {
        throw new NotFoundException("Product topilmadi");
      }
      storage.product_id = product;
    }

    return this.storageRepo.save(storage);
  }

  async remove(id: number) {
    const result = await this.storageRepo.delete(id);
    if (!result.affected) {
      throw new NotFoundException("Storage topilmadi");
    }
    return { message: "Storage muvaffaqiyatli o'chirildi" };
  }
}
