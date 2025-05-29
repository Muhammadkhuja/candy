import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateStorageDto {
  @Field()
  @ApiProperty({ example: 150, description: "Ombordagi mahsulot soni" })
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @Field()
  @ApiProperty({ example: "2025-05-29", description: "Oxirgi kirim sanasi" })
  @IsString()
  @IsNotEmpty()
  last_stoked: string;

  @Field()
  @ApiProperty({
    example: 20,
    description: "Minimal daraja (xavf belgisi uchun)",
  })
  @IsInt()
  @IsNotEmpty()
  min_level: number;

  @Field()
  @ApiProperty({ example: 1, description: "Mahsulot IDsi (Product FK)" })
  @IsInt()
  @IsNotEmpty()
  product_id: number;
}
