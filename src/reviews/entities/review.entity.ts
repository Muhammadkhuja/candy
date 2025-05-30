import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
    Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Product } from "../../product/entities/product.entity";
import { Sevimli } from "../../sevimli/entities/sevimli.entity";

@ObjectType()
@Entity()
export class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Orderning noyob identifikatori" })
  id: number;

  @ManyToOne((type) => User, (user_id) => user_id.review)
  @Field((type) => User)
  @ApiProperty({
    type: () => User,
    description: "Savat tegishli foydalanuvchi",
  })
  user_id: User;

  @ManyToOne((type) => Sevimli, (sevimli_id) => sevimli_id.review)
  @Field((type) => Sevimli)
  @ApiProperty({
    type: () => Sevimli,
    description: "Savat tegishli foydalanuvchi",
  })
  sevimli_id: Sevimli;

  @ManyToOne((type) => Product, (product_id) => product_id.review)
  @Field((type) => Product)
  @ApiProperty({
    type: () => Product,
    description: "Savat tegishli foydalanuvchi",
  })
  product_id: Product;

  @ApiProperty({
    description: "Ko'rilgan vaqt",
    example: new Date().toISOString(),
  })
  @Field()
  @CreateDateColumn()
  review_date: Date;

  @Column()
  @Field()
  @ApiProperty({
    example: 4.5,
    description: "Mahsulot reytingi (1.0 - 5.0 oralig'ida)",
  })
  rating: number;
}
