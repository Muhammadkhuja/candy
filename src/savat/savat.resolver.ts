import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { SavatService } from "./savat.service";
import { Savat } from "./entities/savat.entity";
import { CreateSavatDto } from "./dto/create-savat.dto";
import { UpdateSavatDto } from "./dto/update-savat.dto";

@Resolver(() => Savat)
export class SavatResolver {
  constructor(private readonly savatService: SavatService) {}

  @Mutation(() => Savat)
  createSavat(@Args("createSavatInput") createSavatInput: CreateSavatDto) {
    return this.savatService.create(createSavatInput);
  }

  @Query(() => [Savat], { name: "savatlar" })
  findAll() {
    return this.savatService.findAll();
  }

  @Query(() => Savat, { name: "savat" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.savatService.findOne(id);
  }

  @Mutation(() => Savat)
  updateSavat(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateSavatInput") updateSavatInput: UpdateSavatDto
  ) {
    return this.savatService.update(id, updateSavatInput);
  }

  @Mutation(() => Savat)
  removeSavat(@Args("id", { type: () => Int }) id: number) {
    return this.savatService.remove(id);
  }
}
