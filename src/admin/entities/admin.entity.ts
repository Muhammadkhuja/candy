import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from "class-validator";
import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
@Entity()
export class Admin {
  @ApiProperty({ example: 1, description: "Adminning unikal ID raqami" })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali Valiyev", description: "Adminning to'liq ismi" })
  @Field()
  @Column()
  @IsString()
  @IsNotEmpty({ message: "Ism bo'sh bo'lishimi mumkin emas" })
  name: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "Adminning email manzili",
  })
  @Field()
  @Column({ unique: true })
  @IsEmail({}, { message: "Bu email emas" })
  email: string;

  @ApiProperty({
    example: "hello123",
    description: "Parolni hash qilingan holati",
  })
  @Field()
  @Column()
  @IsString()
  @Length(6, 100, { message: "Kamida 6 ta belgi bo'lsin" })
  hashed_password: string;

  @ApiProperty({ example: "admin", description: "Adminning roli" })
  @Field()
  @Column()
  @IsString()
  @IsNotEmpty({ message: "Rol bo'sh bo'lmasligi kerak" })
  role: string;

  @ApiProperty({
    example: "eyJhbGciO",
    description: "Yangilash (refresh) tokeni",
    required: false,
  })
  @Field()
  @Column({ nullable: true })
  refresh_token: string;

  @ApiProperty({
    example: true,
    description: "Admin faolmi yoki yo'q (true/false)",
  })
  @Field()
  @Column({ default: false })
  @IsBoolean()
  is_active: boolean;

  @Column({ nullable: true })
  @Generated("uuid")
  activation_link: string;
}
