import { InputType, Field, ID, Float, PartialType } from "@nestjs/graphql";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsInt, Min, Max } from "class-validator";
import { CreateReviewDto } from "./create-review.dto";

@InputType()
export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @Field(() => ID, { nullable: true })
  @ApiPropertyOptional({ example: 1, description: "Foydalanuvchi IDsi" })
  @IsOptional()
  @IsInt()
  user_id?: number;

  @Field(() => ID, { nullable: true })
  @ApiPropertyOptional({ example: 2, description: "Sevimli IDsi" })
  @IsOptional()
  @IsInt()
  sevimli_id?: number;

  @Field(() => ID, { nullable: true })
  @ApiPropertyOptional({ example: 3, description: "Mahsulot IDsi" })
  @IsOptional()
  @IsInt()
  product_id?: number;

  @Field(() => Float, { nullable: true })
  @ApiPropertyOptional({ example: 4.5, description: "Reyting (1.0 - 5.0)" })
  @IsOptional()
  @IsNumber()
  @Min(1.0)
  @Max(5.0)
  rating?: number;
}
