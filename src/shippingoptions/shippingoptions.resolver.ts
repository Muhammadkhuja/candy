import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ShippingoptionsService } from "./shippingoptions.service";
import { Shippingoption } from "./entities/shippingoption.entity";
import { CreateShippingoptionDto } from "./dto/create-shippingoption.dto";
import { UpdateShippingoptionDto } from "./dto/update-shippingoption.dto";

@Resolver(() => Shippingoption)
export class ShippingoptionsResolver {
  constructor(
    private readonly shippingoptionsService: ShippingoptionsService
  ) {}

  @Mutation(() => Shippingoption)
  createShippingoption(
    @Args("createShippingoptionInput")
    createShippingoptionDto: CreateShippingoptionDto
  ) {
    return this.shippingoptionsService.create(createShippingoptionDto);
  }

  @Query(() => [Shippingoption], { name: "shippingoptions" })
  findAll() {
    return this.shippingoptionsService.findAll();
  }

  @Query(() => Shippingoption, { name: "shippingoption" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.shippingoptionsService.findOne(id);
  }

  @Mutation(() => Shippingoption)
  updateShippingoption(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateShippingoptionInput")
    updateShippingoptionDto: UpdateShippingoptionDto
  ) {
    return this.shippingoptionsService.update(id, updateShippingoptionDto);
  }

  @Mutation(() => String)
  removeShippingoption(@Args("id", { type: () => Int }) id: number) {
    return this.shippingoptionsService.remove(id);
  }
}
