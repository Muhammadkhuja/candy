import { InputType, Field, ID } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt } from "class-validator";

@InputType()
export class CreateSavatDto {
  @Field(() => ID)
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchi IDsi (savat kimga tegishli)",
  })
  @IsNotEmpty({ message: "user_id bo'sh bo'lishi mumkin emas" })
  @IsInt({ message: "user_id butun son bo'lishi kerak" })
  user_id: number;
}
