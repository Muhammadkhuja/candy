import { Field, InputType, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class UpdateOrderDto {
  @Field()
  @ApiProperty({
    example: "2025-05-29",
    description: "Buyurtma sanasi",
    required: false,
  })
  order_date?: string;

  @Field()
  @ApiProperty({
    example: "250000",
    description: "Buyurtma umumiy summasi",
    required: false,
  })
  total_amout?: string;

  @Field()
  @ApiProperty({
    example: "Naqd",
    description: "To'lov usuli",
    required: false,
  })
  payment_method?: string;

  @Field()
  @ApiProperty({
    example: "to'landi",
    description: "To'lov holati",
    required: false,
  })
  payment_status?: string;

  @Field()
  @ApiProperty({
    example: "Toshkent shahri, Chilonzor tumani, 12-kvartal",
    description: "Yetkazib berish manzili",
    required: false,
  })
  shipping_address?: string;

  @Field()
  @ApiProperty({
    example: "+998901234567",
    description: "Telefon raqami",
    required: false,
  })
  phone?: string;

  @Field()
  @ApiProperty({
    example: "Eshikni taqillatmang",
    description: "Izoh",
    required: false,
  })
  note?: string;

  @Field( )
  @ApiProperty({ example: 5, description: "Savat ID raqami", required: false })
  savat_id?: number;

  @Field( )
  @ApiProperty({
    example: 3,
    description: "Foydalanuvchi ID raqami",
    required: false,
  })
  user_id?: number;

  @Field( )
  @ApiProperty({
    example: 2,
    description: "Yetkazib berish opsiyasi ID",
    required: false,
  })
  shoppingoption_id?: number;
}
