import { Resolver, Query, Mutation, Args, Int, ID } from "@nestjs/graphql";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";

@Resolver("category")
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(
    @Args("createCategoryDto") createCategoryDto: CreateCategoryDto
  ) {
    return this.categoryService.create(createCategoryDto);
  }

  @Query(() => [Category])
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => Category)
  findOne(@Args("id") id: number) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateCategoryDto") updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Mutation(() => Category)
  removeCategory(@Args("id", { type: () => ID }) id: number) {
    return this.categoryService.remove(id);
  }
}
