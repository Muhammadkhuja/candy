import { InputType, Field, PartialType } from "@nestjs/graphql";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateProductDto } from "./create-product.dto";

@InputType()
export class UpdateProductDto extends PartialType(CreateProductDto) {
  @Field({ nullable: true })
  @ApiPropertyOptional({ example: "Pepsi Max" })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: "https://cdn.site.com/pepsi.jpg" })
  @IsString()
  @IsOptional()
  image?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: "Yangi gazli ichimlik" })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: 2 })
  @IsNumber()
  @IsOptional()
  category_id?: number;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: "2L" })
  @IsString()
  @IsOptional()
  size?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: "2kg" })
  @IsString()
  @IsOptional()
  weight?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: "Suv, shakar, limon kislotasi" })
  @IsString()
  @IsOptional()
  ingridients?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: "15000" })
  @IsString()
  @IsOptional()
  price?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: "6 oy" })
  @IsString()
  @IsOptional()
  shelf_life?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  is_available?: boolean;
}
