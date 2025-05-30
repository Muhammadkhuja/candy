import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Card } from "../../cards/entities/card.entity";
import { Order } from "../../order/entities/order.entity";
import { Savat } from "../../savat/entities/savat.entity";
import { Sevimli } from "../../sevimli/entities/sevimli.entity";
import { Review } from "../../reviews/entities/review.entity";

@ObjectType()
@Entity()
export class User {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchining unikal ID raqami",
  })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Jasur Ergashev",
    description: "Foydalanuvchining toliq ismi",
  })
  @Field()
  @Column()
  @IsString()
  @IsNotEmpty({ message: "Ism bo'sh bo'lishi mumkin emas" })
  name: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchining telefon raqami",
  })
  @Field()
  @Column({ unique: true })
  @IsString()
  @IsNotEmpty({ message: "Telefon raqami bo'sh bo'lmasligi kerak" })
  phone: string;

  @ApiProperty({
    example: "jasur@example.com",
    description: "Foydalanuvchining email manzili",
  })
  @Field()
  @Column({ unique: true })
  @IsEmail({}, { message: "Email notogri kiritilgan" })
  email: string;

  @ApiProperty({
    example: "pas123",
    description: "Parol (hashlangan holatda)",
  })
  @Field()
  @Column()
  @IsString()
  @Length(6, 100, {
    message: "Parol uzunligi kamida 6 ta belgidan iborat bolishi kerak",
  })
  hashed_password: string;

  @ApiProperty({
    example: "Toshkent, Yunusobod",
    description: "Foydalanuvchining yashash manzili",
  })
  @Field()
  @Column()
  @IsString()
  @IsNotEmpty({ message: "Manzil bo'sh bo'lishi mumkin emas" })
  location: string;

  @ApiProperty({
    example: true,
    description: "Foydalanuvchi faolmi yoki yoq (true/false)",
  })
  @Field()
  @Column({ default: true })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({ example: "user", description: "Foydalanuvchining roli" })
  @Field()
  @Column()
  @IsString()
  @IsNotEmpty({ message: "Rol bo'sh bo'lmasligi kerak" })
  role: string;

  @ApiProperty({
    example: "null",
    description: "Refresh token ",
    required: false,
  })
  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  refresh_token: string;

  @OneToMany((type) => Card, (card) => card.user_id)
  @Field((type) => [Card])
  cards: Card[];

  @OneToMany((type) => Order, (order) => order.user_id)
  @Field((type) => [Order])
  order: Order[];

  @OneToMany((type) => Savat, (savat) => savat.user_id)
  @Field((type) => [Savat])
  savat: Savat[];

  @OneToMany((type) => Sevimli, (sevimli) => sevimli.user_id)
  @Field((type) => [Sevimli])
  sevimli: Sevimli[];

  @OneToMany((type) => Review, (review) => review.user_id)
  @Field((type) => [Review])
  review: Review[];
}
