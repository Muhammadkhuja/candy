import { Field, InputType, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

@InputType()
export class CreateCardDto  {
  @Field()
  @ApiProperty({ example: "Visa Platinum", description: "Karta nomi" })
  @IsString()
  @IsNotEmpty({ message: "Karta nomi bo'sh bo'lishi mumkin emas" })
  name: string;

  @Field()
  @ApiProperty({ example: "1234 5678 9012 3456", description: "Karta raqami" })
  @IsString()
  @IsNotEmpty({ message: "Karta raqami bo'sh bo'lishi mumkin emas" })
  @Length(16, 19, {
    message: "Karta raqami 16 dan 19 gacha belgidan iborat bo'lishi kerak",
  })
  number: string;

  @Field()
  @ApiProperty({ example: "12/26", description: "Karta amal qilish muddati" })
  @IsString()
  @IsNotEmpty({ message: "Karta amal qilish muddati ko'rsatilishi kerak" })
  date: string;

    // @Field(() => Int)
    // @ApiProperty({ example: 3, description: "Foydalanuvchi ID'si" })
    // @IsOptional()
    // @IsInt({ message: "user_id butun son bo'lishi kerak" })
    // user_id: number;
}
