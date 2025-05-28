import { Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class UpdateAdminPasswordDto {
  @Field()
  @IsString()
  @Length(6, 100, { message: "Kamida 6 ta belgi bo'lsin" })
  @ApiProperty({
    example: "hello123",
    description: "Parolni kiriting",
  })
  oldpassword: string;

  @Field()
  @IsString()
  @Length(6, 100, { message: "Kamida 6 ta belgi bo'lsin" })
  @ApiProperty({
    example: "parol123",
    description: "Yangi parolni kiriting",
  })
  newpassword: string;
}
