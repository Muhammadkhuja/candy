
import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length, IsNumber, IsInt } from "class-validator";
import { CreateCardDto } from "./create-card.dto";

@InputType()
// export class UpdateCardDto extends PartialType(CreateCardDto) {
export class UpdateCardDto{
  @Field({ nullable: true })
  @ApiProperty({
    example: "Visa Platinum",
    description: "Karta nomi",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "1234 5678 9012 3456",
    description: "Karta raqami",
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(16, 19)
  number?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "12/26",
    description: "Karta amal qilish muddati",
    required: false,
  })
  @IsOptional()
  @IsString()
  date?: string;

  @Field(() => Int)
  @ApiProperty({ example: 3, description: "Foydalanuvchi ID'si" })
  @IsOptional()
  @IsInt({ message: "user_id butun son bo'lishi kerak" })
  user_id?: number;
}
