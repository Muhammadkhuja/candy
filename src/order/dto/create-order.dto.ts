import { Field, InputType, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";
import { Shippingoption } from "../../shippingoptions/entities/shippingoption.entity";

@InputType()
export class CreateOrderDto {
  @Field()
  @ApiProperty({ example: "2025-05-29", description: "Buyurtma sanasi" })
  order_date: string;

  @Field()
  @ApiProperty({ example: "250000", description: "Buyurtma umumiy summasi" })
  total_amout: string;

  @Field()
  @ApiProperty({ example: "Naqd", description: "To'lov usuli" })
  payment_method: string;

  @Field()
  @ApiProperty({ example: "to'landi", description: "To'lov holati" })
  payment_status: string;

  @Field()
  @ApiProperty({
    example: "Toshkent shahri, Chilonzor tumani, 12-kvartal",
    description: "Yetkazib berish manzili",
  })
  shipping_address: string;

  @Field()
  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  phone: string;

  @Field()
  @ApiProperty({ example: "Eshikni taqillatmang", description: "Izoh" })
  note: string;

  //   @Field(() => Int)
  //   @ApiProperty({ example: 5, description: "Savat ID raqami" })
  //   savat_id: number;

  @Field({ nullable: true })
  @ApiProperty({ example: 3, description: "Foydalanuvchi ID raqami" })
  user: number;

  @Field({ nullable: true })
  @ApiProperty({ example: 2, description: "Yetkazib berish opsiyasi ID" })
  shoppingoption_id: number;
}
