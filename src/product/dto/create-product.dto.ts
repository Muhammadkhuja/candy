import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateProductDto {
  @Field()
  @ApiProperty({ example: "Pepsi", description: "Mahsulot nomi" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @ApiProperty({
    example: "https://cdn.site.com/image.jpg",
    description: "Rasm URL",
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @Field()
  @ApiProperty({ example: "Shirin gazli ichimlik", description: "Tavsif" })
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @ApiProperty({ example: 1, description: "Kategoriya ID" })
  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @Field()
  @ApiProperty({ example: "1L", description: "O'lchami" })
  @IsString()
  @IsNotEmpty()
  size: string;

  @Field()
  @ApiProperty({ example: "1kg", description: "Vazni" })
  @IsString()
  @IsNotEmpty()
  weight: string;

  @Field()
  @ApiProperty({ example: "Suv, shakar, gaz", description: "Tarkibi" })
  @IsString()
  @IsNotEmpty()
  ingridients: string;

  @Field()
  @ApiProperty({ example: "12000", description: "Narxi" })
  @IsString()
  @IsNotEmpty()
  price: string;

  @Field()
  @ApiProperty({ example: "12 oy", description: "Yaroqlilik muddati" })
  @IsString()
  @IsNotEmpty()
  shelf_life: string;

  @Field()
  @ApiProperty({ example: true, description: "Mavjudligi" })
  @IsBoolean()
  @IsNotEmpty()
  is_available: boolean;
}
