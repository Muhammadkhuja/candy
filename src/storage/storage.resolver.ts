import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { StorageService } from "./storage.service";
import { Storage } from "./entities/storage.entity";
import { CreateStorageDto } from "./dto/create-storage.dto";
import { UpdateStorageDto } from "./dto/update-storage.dto";

@Resolver(() => Storage)
export class StorageResolver {
  constructor(private readonly storageService: StorageService) {}

  @Mutation(() => Storage)
  createStorage(@Args("createStorageDto") createStorageDto: CreateStorageDto) {
    return this.storageService.create(createStorageDto);
  }

  @Query(() => [Storage], { name: "getAllStorage" })
  findAll() {
    return this.storageService.findAll();
  }

  @Query(() => Storage, { name: "getOneStorage" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.storageService.findOne(id);
  }

  @Mutation(() => Storage)
  updateStorage(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateStorageDto") updateStorageDto: UpdateStorageDto
  ) {
    return this.storageService.update(id, updateStorageDto);
  }

  @Mutation(() => String)
  removeStorage(@Args("id", { type: () => Int }) id: number) {
    return this.storageService.remove(id);
  }
}
