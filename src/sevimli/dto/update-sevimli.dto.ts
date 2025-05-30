import { InputType, Field, ID, PartialType } from "@nestjs/graphql";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional } from "class-validator";
import { CreateSevimliDto } from "./create-sevimli.dto";

@InputType()
export class UpdateSevimliDto extends PartialType(CreateSevimliDto) {
  @Field(() => ID, { nullable: true })
  @ApiPropertyOptional({
    example: 1,
    description: "Foydalanuvchi IDsi (yangilanishi mumkin)",
  })
  @IsOptional()
  @IsInt()
  user_id?: number;

  @Field(() => ID, { nullable: true })
  @ApiPropertyOptional({
    example: 5,
    description: "Mahsulot IDsi (yangilanishi mumkin)",
  })
  @IsOptional()
  @IsInt()
  product_id?: number;
}
