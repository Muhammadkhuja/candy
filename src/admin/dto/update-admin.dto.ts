import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty, PartialType } from "@nestjs/swagger";

@InputType()
export class UpdateAdminDto {
  @Field({ nullable: true })
  @ApiProperty({
    example: "Ali Valiyev",
    description: "Adminning to'liq ismi"
  })
  name?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "admin",
    description: "Adminning roli"
  })
  role?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "ali@example.com",
    description: "Adminning email manzili"
  })
  email?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "+998901234567",
    description: "Adminning telefon raqami"
  })
  phone?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "hello123",
    description: "Parolni kiriting"
  })
  password?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "hello123",
    description: "Tasdiqlash paroli"
  })
  confirm_password?: string;
}
