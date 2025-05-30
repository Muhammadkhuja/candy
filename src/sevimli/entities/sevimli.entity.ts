import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Product } from "../../product/entities/product.entity";
import { Review } from "../../reviews/entities/review.entity";

@ObjectType()
@Entity()
export class Sevimli {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: "Sevimli tabelining noyob identifikatori",
  })
  id: number;

  @ManyToOne((type) => User, (user_id) => user_id.sevimli)
  @Field((type) => User)
  @ApiProperty({
    type: () => User,
    description: "sevimliga tegishli foydalanuvchi",
  })
  user_id: User;

  @ManyToOne((type) => Product, (product_id) => product_id.sevimli)
  @Field((type) => Product)
  @ApiProperty({
    type: () => Product,
    description: "sevimliga tegishli foydalanuvchi",
  })
  product_id: Product;

  @ApiProperty({
    description: "Yaratilgan vaqt",
    example: new Date().toISOString(),
  })
  @Field()
  @CreateDateColumn()
  created_at: Date;

  
    @OneToMany((type) => Review, (review) => review.sevimli_id)
    @Field((type) => [Review])
    review: Review[];
}
