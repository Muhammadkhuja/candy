import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ReviewsService } from "./reviews.service";
import { Review } from "./entities/review.entity";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review)
  createReview(
    @Args("createReviewInput") createReviewInput: CreateReviewDto
  ) {
    return this.reviewsService.create(createReviewInput);
  }

  @Query(() => [Review], { name: "reviews" })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Query(() => Review, { name: "review" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.reviewsService.findOne(id);
  }

  @Mutation(() => Review)
  updateReview(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateReviewInput") updateReviewInput: UpdateReviewDto
  ) {
    return this.reviewsService.update(id, updateReviewInput);
  }

  @Mutation(() => Review)
  removeReview(@Args("id", { type: () => Int }) id: number) {
    return this.reviewsService.remove(id);
  }
}
