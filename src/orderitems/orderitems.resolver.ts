import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { OrderitemsService } from "./orderitems.service";
import { Orderitem } from "./entities/orderitem.entity";
import { CreateOrderitemDto } from "./dto/create-orderitem.dto";
import { UpdateOrderitemDto } from "./dto/update-orderitem.dto";

@Resolver(() => Orderitem)
export class OrderitemsResolver {
  constructor(private readonly orderitemsService: OrderitemsService) {}

  @Mutation(() => Orderitem)
  createOrderitem(
    @Args("createOrderitemInput") createOrderitemInput: CreateOrderitemDto
  ) {
    return this.orderitemsService.create(createOrderitemInput);
  }

  @Query(() => [Orderitem], { name: "orderitems" })
  findAll() {
    return this.orderitemsService.findAll();
  }

  @Query(() => Orderitem, { name: "orderitem" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.orderitemsService.findOne(id);
  }

  @Mutation(() => Orderitem)
  updateOrderitem(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateOrderitemInput") updateOrderitemInput: UpdateOrderitemDto
  ) {
    return this.orderitemsService.update(id, updateOrderitemInput);
  }

  @Mutation(() => Orderitem)
  removeOrderitem(@Args("id", { type: () => Int }) id: number) {
    return this.orderitemsService.remove(id);
  }
}
