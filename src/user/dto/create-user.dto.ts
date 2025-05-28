import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

@InputType()
export class CreateUserDto {
  @Field()
  @ApiProperty({
    example: "Jasur Ergashev",
    description: "Foydalanuvchining to'liq ismi",
  })
  @IsString()
  @IsNotEmpty({ message: "Ism bo'sh bo'lishi mumkin emas" })
  name: string;

  @Field()
  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchining telefon raqami",
  })
  @IsString()
  @IsNotEmpty({ message: "Telefon raqami majburiy" })
  phone: string;

  @Field()
  @ApiProperty({ example: "jasur@example.com", description: "Email manzili" })
  @IsEmail({}, { message: "Email noto'g'ri kiritilgan" })
  email: string;

  @Field()
  @ApiProperty({ example: "hello123", description: "Parol (oddiy holatda)" })
  @IsString()
  @Length(6, 100, {
    message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
  })
  password: string;

  @Field()
  @ApiProperty({ example: "hello123", description: "Parol tasdiqlanishi" })
  @IsString()
  @Length(6, 100, {
    message: "Parol tasdiqlanishi kamida 6 ta belgidan iborat bo'lishi kerak",
  })
  confirm_password: string;

  @Field()
  @ApiProperty({
    example: "Toshkent, Yunusobod",
    description: "Foydalanuvchining manzili",
  })
  @IsString()
  @IsNotEmpty({ message: "Manzil majburiy" })
  location: string;

  @Field()
  @ApiProperty({ example: "user", description: "Foydalanuvchining roli" })
  @IsString()
  @IsNotEmpty({ message: "Rol majburiy" })
  role: string;
}
