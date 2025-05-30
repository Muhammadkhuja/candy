import { InputType, Field, ID, Int, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsPositive } from "class-validator";
import { Product } from "../../product/entities/product.entity";
import { Savat } from "../../savat/entities/savat.entity";

@InputType()
export class CreateSavatitemDto {
  @Field(() => Int)
  @ApiProperty({
    example: 2,
    description: "Mahsulot soni (miqdori)",
  })
  @IsNotEmpty({ message: "quantity bo'sh bo'lishi mumkin emas" })
  @IsInt({ message: "quantity butun son bo'lishi kerak" })
  @IsPositive({ message: "quantity musbat bo'lishi kerak" })
  quantity: number;

  @Field(() => Float)
  @ApiProperty({
    example: 15000,
    description: "Bir dona mahsulot narxi",
  })
  @IsNotEmpty({ message: "unit_price bo'sh bo'lishi mumkin emas" })
  @IsPositive({ message: "unit_price musbat bo'lishi kerak" })
  unit_price: number;

  @Field(() => ID)
  @ApiProperty({
    type: Savat,
    description: "Qaysi savatga tegishli (savat_id)",
  })
  @IsNotEmpty({ message: "savat_id bo'sh bo'lishi mumkin emas" })
  @IsInt({ message: "savat_id butun son bo'lishi kerak" })
  savat_id: number;

  @Field(() => ID)
  @ApiProperty({
    type: Product,
    description: "Mahsulot IDsi (product_id)",
  })
  @IsNotEmpty({ message: "product_id bo'sh bo'lishi mumkin emas" })
  @IsInt({ message: "product_id butun son bo'lishi kerak" })
  product_id: number;
}
