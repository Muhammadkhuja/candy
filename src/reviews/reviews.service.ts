import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Review } from "./entities/review.entity";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { User } from "../user/entities/user.entity";
import { Product } from "../product/entities/product.entity";
import { Sevimli } from "../sevimli/entities/sevimli.entity";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Sevimli)
    private readonly sevimliRepo: Repository<Sevimli>
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const user = await this.userRepo.findOneBy({ id: createReviewDto.user_id });
    if (!user) throw new NotFoundException("Foydalanuvchi topilmadi");

    const product = await this.productRepo.findOneBy({
      id: createReviewDto.product_id,
    });
    if (!product) throw new NotFoundException("Mahsulot topilmadi");

    const sevimli = await this.sevimliRepo.findOneBy({
      id: createReviewDto.sevimli_id,
    });
    if (!sevimli) throw new NotFoundException("Sevimli topilmadi");

    const review = this.reviewRepo.create({
      user_id: user,
      product_id: product,
      sevimli_id: sevimli,
      rating: createReviewDto.rating,
      review_date: new Date(),
    });

    return this.reviewRepo.save(review);
  }

  async findAll() {
    return this.reviewRepo.find({
      relations: ["user_id", "product_id", "sevimli_id"],
    });
  }

  async findOne(id: number) {
    const review = await this.reviewRepo.findOne({
      where: { id },
      relations: ["user_id", "product_id", "sevimli_id"],
    });
    if (!review) throw new NotFoundException("Sharh topilmadi");
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepo.findOne({
      where: { id },
      relations: ["user_id", "product_id", "sevimli_id"],
    });
    if (!review) throw new NotFoundException("Sharh topilmadi");

    Object.assign(review, updateReviewDto);

    if (updateReviewDto.user_id) {
      const user = await this.userRepo.findOneBy({
        id: updateReviewDto.user_id,
      });
      if (!user) throw new NotFoundException("Foydalanuvchi topilmadi");
      review.user_id = user;
    }

    if (updateReviewDto.product_id) {
      const product = await this.productRepo.findOneBy({
        id: updateReviewDto.product_id,
      });
      if (!product) throw new NotFoundException("Mahsulot topilmadi");
      review.product_id = product;
    }

    if (updateReviewDto.sevimli_id) {
      const sevimli = await this.sevimliRepo.findOneBy({
        id: updateReviewDto.sevimli_id,
      });
      if (!sevimli) throw new NotFoundException("Sevimli topilmadi");
      review.sevimli_id = sevimli;
    }

    return this.reviewRepo.save(review);
  }

  async remove(id: number) {
    const result = await this.reviewRepo.delete(id);
    if (!result.affected) throw new NotFoundException("Sharh topilmadi");
    return { message: "Sharh muvaffaqiyatli o'chirildi" };
  }
}
