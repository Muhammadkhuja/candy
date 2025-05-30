import { InputType, Field, ID, PartialType } from "@nestjs/graphql";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsInt } from "class-validator";
import { CreateSavatDto } from "./create-savat.dto";

@InputType()
export class UpdateSavatDto extends PartialType(CreateSavatDto) {
  @Field(() => ID, { nullable: true })
  @ApiPropertyOptional({
    example: 1,
    description: "Foydalanuvchi IDsi (o'zgartiriladigan bo'lsa)",
  })
  @IsOptional()
  @IsInt({ message: "user_id butun son bo'lishi kerak" })
  user_id?: number;
}
