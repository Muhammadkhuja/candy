import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { Sevimli } from '../sevimli/entities/sevimli.entity';
import { ReviewsResolver } from './reviews.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Product, Sevimli])],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewsResolver],
  exports: [ReviewsService, ReviewsResolver],
})
export class ReviewsModule {}
