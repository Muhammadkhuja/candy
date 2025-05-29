import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "../../product/entities/product.entity";

@ObjectType()
@Entity()
export class Category {
  @ApiProperty({ example: 1, description: "Adminning unikal ID raqami" })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Texnika" })
  @IsString()
  @IsNotEmpty()
  @Field()
  @Column()
  name: string;

  @ApiProperty({ example: "https://cdn.site.com/image.jpg" })
  @IsString()
  @IsNotEmpty()
  @Field()
  @Column()
  image: string;

  @ApiProperty({ example: "Texnikalar uchun kategoriya" })
  @IsString()
  @IsNotEmpty()
  @Field()
  @Column()
  description: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.children)
  parent_id: Category;

  @Field(() => [Category], { nullable: true })
  @OneToMany(() => Category, (category) => category.parent_id)
  children: Category[];

  @OneToMany((type)=> Product, (product)=> product.category_id)
  @Field((type)=> [Product])
  product: Product[]
}
