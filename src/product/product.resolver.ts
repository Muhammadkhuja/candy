import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ProductService } from "./product.service";
import { Product } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(
    @Args("createProductInput") createProductDto: CreateProductDto
  ) {
    return this.productService.create(createProductDto);
  }

  @Query(() => [Product], { name: "products" })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: "product", nullable: true })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateProductInput") updateProductDto: UpdateProductDto
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Mutation(() => String)
  removeProduct(@Args("id", { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }
}
