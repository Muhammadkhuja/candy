import { InputType, Field, ID, Int, Float, PartialType } from "@nestjs/graphql";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsInt, IsPositive } from "class-validator";
import { CreateSavatitemDto } from "./create-savatitem.dto";
import { Product } from "../../product/entities/product.entity";
import { Savat } from "../../savat/entities/savat.entity";

@InputType()
export class UpdateSavatitemDto extends PartialType(CreateSavatitemDto) {
  @Field()
  @ApiPropertyOptional({ example: 3, description: "Yangilangan miqdor" })
  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;

  @Field()
  @ApiPropertyOptional({ example: 18000, description: "Yangilangan narx" })
  @IsOptional()
  @IsPositive()
  unit_price?: number;

  @Field()
  @ApiPropertyOptional({ type: Savat, description: "Yangilangan savat_id" })
  @IsOptional()
  @IsInt()
  savat_id?: number;

  @Field()
  @ApiPropertyOptional({ type: Product, description: "Yangilangan product_id" })
  @IsOptional()
  @IsInt()
  product_id?: number;
}
