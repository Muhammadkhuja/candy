import { Resolver, Query, Mutation, Args, Int, ID } from "@nestjs/graphql";
import { CardsService } from "./cards.service";
import { Card } from "./entities/card.entity";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";

@Resolver(() => Card)
export class CardsResolver {
  constructor(private readonly cardsService: CardsService) {}

  @Query(() => [Card])
  findAll() {
    return this.cardsService.findAll();
  }

  @Query(() => Card)
  findOne(@Args("id") id: number) {
    return this.cardsService.findOne(id);
  }

  @Mutation(() => Card)
  create(@Args("createCardInput") createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Mutation(() => Card)
  update(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateCard") updateCardDto: UpdateCardDto
  ) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Mutation(() => Number)
  async remove(@Args("id", { type: () => ID }) id: number) {
    return this.cardsService.remove(id);
  }
}
