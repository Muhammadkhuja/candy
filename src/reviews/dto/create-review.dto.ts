import { InputType, Field, ID, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsInt, Min, Max } from "class-validator";

@InputType()
export class CreateReviewDto {
  @Field(() => ID)
  @ApiProperty({ example: 1, description: "Foydalanuvchi IDsi" })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @Field(() => ID)
  @ApiProperty({ example: 2, description: "Sevimli IDsi" })
  @IsInt()
  @IsNotEmpty()
  sevimli_id: number;

  @Field(() => ID)
  @ApiProperty({ example: 3, description: "Mahsulot IDsi" })
  @IsInt()
  @IsNotEmpty()
  product_id: number;

  @Field(() => Float)
  @ApiProperty({
    example: 4.5,
    description: "Reyting (1.0 dan 5.0 gacha)",
  })
  @IsNumber()
  @Min(1.0)
  @Max(5.0)
  rating: number;
}
