import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { SevimliService } from "./sevimli.service";
import { Sevimli } from "./entities/sevimli.entity";
import { CreateSevimliDto } from "./dto/create-sevimli.dto";
import { UpdateSevimliDto } from "./dto/update-sevimli.dto";

@Resolver(() => Sevimli)
export class SevimliResolver {
  constructor(private readonly sevimliService: SevimliService) {}

  @Mutation(() => Sevimli)
  createSevimli(
    @Args("createSevimliInput") createSevimliInput: CreateSevimliDto
  ) {
    return this.sevimliService.create(createSevimliInput);
  }

  @Query(() => [Sevimli], { name: "sevimlilar" })
  findAll() {
    return this.sevimliService.findAll();
  }

  @Query(() => Sevimli, { name: "sevimli" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.sevimliService.findOne(id);
  }

  @Mutation(() => Sevimli)
  updateSevimli(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateSevimliInput") updateSevimliInput: UpdateSevimliDto
  ) {
    return this.sevimliService.update(id, updateSevimliInput);
  }

  @Mutation(() => Sevimli)
  removeSevimli(@Args("id", { type: () => Int }) id: number) {
    return this.sevimliService.remove(id);
  }
}
