import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User)
  findOne(@Args("id") id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  create(@Args("createUser") createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Mutation(() => User)
  update(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateUser") updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Mutation(() => Number)
  async remove(@Args("id", { type: () => ID }) id: number) {
    return this.userService.remove(id);
  }
}
