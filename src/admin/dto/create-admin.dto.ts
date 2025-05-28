import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class CreateAdminDto {
  @Field()
  @ApiProperty({ example: "Ali Valiyev", description: "Adminning to'liq ismi" })
  name: string;
  @Field()
  @ApiProperty({ example: "admin", description: "Adminning roli" })
  role: string;
  @Field()
  @ApiProperty({
    example: "ali@example.com",
    description: "Adminning email manzili",
  })
  email: string;
  @Field()
  @ApiProperty({
    example: "hello123",
    description: "Parolni kiriting",
  })
  password: string;
  @Field()
  @ApiProperty({
    example: "hello123",
    description: "Tasdiqlash paroli",
  })
  confirm_password: string;
}
