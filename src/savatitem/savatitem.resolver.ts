import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { SavatitemService } from "./savatitem.service";
import { CreateSavatitemDto } from "./dto/create-savatitem.dto";
import { UpdateSavatitemDto } from "./dto/update-savatitem.dto";
import { SavatItem } from "./entities/savatitem.entity";

@Resolver(() => SavatItem)
export class SavatitemResolver {
  constructor(private readonly savatitemService: SavatitemService) {}

  @Mutation(() => SavatItem)
  createSavatitem(
    @Args("createSavatitemInput") createSavatitemInput: CreateSavatitemDto
  ) {
    return this.savatitemService.create(createSavatitemInput);
  }

  @Query(() => [SavatItem], { name: "savatitems" })
  findAll() {
    return this.savatitemService.findAll();
  }

  @Query(() => SavatItem, { name: "savatitem" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.savatitemService.findOne(id);
  }

  @Mutation(() => SavatItem)
  updateSavatitem(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateSavatitemInput") updateSavatitemInput: UpdateSavatitemDto
  ) {
    return this.savatitemService.update(id, updateSavatitemInput);
  }

  @Mutation(() => SavatItem)
  removeSavatitem(@Args("id", { type: () => Int }) id: number) {
    return this.savatitemService.remove(id);
  }
}
