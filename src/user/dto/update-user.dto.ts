import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  @ApiProperty({
    example: "Jasur Ergashev",
    description: "Foydalanuvchining to'liq ismi",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "+998901234567",
    description: "Telefon raqami",
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "jasur@example.com",
    description: "Email manzili",
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: "Email noto'g'ri formatda kiritilgan" })
  email?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "hello123",
    description: "Yangi parol",
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(6, 100, {
    message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
  })
  password?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "hello123",
    description: "Tasdiqlash paroli",
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(6, 100, {
    message: "Tasdiqlash paroli ham kamida 6 ta belgi bo'lishi kerak",
  })
  confirm_password?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "Toshkent, Yunusobod",
    description: "Foydalanuvchining yashash manzili",
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;
  
  @Field({ nullable: true })
  @ApiProperty({
    example: "user",
    description: "Foydalanuvchining roli",
    required: false,
  })
  @IsOptional()
  @IsString()
  role?: string;
}
