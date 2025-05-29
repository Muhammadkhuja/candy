import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepo.save(createCategoryDto)
  }

  async findAll() {
    return await this.categoryRepo.find({ relations: ["cards"] });
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOneBy({ id })
    if(!category){
      throw new NotFoundException("category topilmadi")
    }
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const update = await this.categoryRepo.update(id, updateCategoryDto)
    if(!update){
      throw new NotFoundException("category topilmadi");
    }
    return this.categoryRepo.findOne({where: {id}})
  }

  async remove(id: number) {
    const delet = await this.categoryRepo.delete(id)
    if(delet.affected === 0){
      throw new NotFoundException("category topilmadi");
    }
    return {message: `${id}-id muvaffaqiyatli o'chirildi`}
  }
}
