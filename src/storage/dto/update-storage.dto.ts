import { PartialType } from "@nestjs/mapped-types";
import { CreateStorageDto } from "./create-storage.dto";
import { InputType, Field, Int } from "@nestjs/graphql";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateStorageDto extends PartialType(CreateStorageDto) {
  @Field()
  @ApiPropertyOptional({ example: 100, description: "Ombordagi mahsulot soni" })
  @IsInt()
  @IsOptional()
  quantity?: number;

  @Field()
  @ApiPropertyOptional({
    example: "2025-06-01",
    description: "Oxirgi kirim sanasi",
  })
  @IsString()
  @IsOptional()
  last_stoked?: string;

  @Field()
  @ApiPropertyOptional({ example: 10, description: "Minimal daraja" })
  @IsInt()
  @IsOptional()
  min_level?: number;

  @Field()
  @ApiPropertyOptional({ example: 1, description: "Yangilangan mahsulot IDsi" })
  @IsInt()
  @IsOptional()
  product_id?: number;
}
