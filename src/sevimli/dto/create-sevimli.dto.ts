import { InputType, Field, ID } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

@InputType()
export class CreateSevimliDto {
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchi IDsi",
  })
  @IsNotEmpty({ message: "user_id bo'sh bo'lmasligi kerak" })
  @IsInt({ message: "user_id butun son bo'lishi kerak" })
  user_id: number;

  @Field(() => ID)
  @ApiProperty({
    example: 5,
    description: "Mahsulot IDsi",
  })
  @IsNotEmpty({ message: "product_id bo'sh bo'lmasligi kerak" })
  @IsInt({ message: "product_id butun son bo'lishi kerak" })
  product_id: number;
}
