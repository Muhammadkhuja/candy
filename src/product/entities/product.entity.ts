import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../../category/entities/category.entity";
import { Storage } from "../../storage/entities/storage.entity";
import { Orderitem } from "../../orderitems/entities/orderitem.entity";
import { SavatItem } from "../../savatitem/entities/savatitem.entity";
import { Sevimli } from "../../sevimli/entities/sevimli.entity";
import { Review } from "../../reviews/entities/review.entity";

@ObjectType()
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Mahsulotning unikal ID raqami" })
  id: number;

  @Field()
  @Column()
  @ApiProperty({ example: "Pepsi", description: "Mahsulot nomi" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @Column()
  @ApiProperty({
    example: "https://cdn.site.com/image.jpg",
    description: "Mahsulot rasmi URL manzili",
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @Field()
  @Column()
  @ApiProperty({
    example: "Shirin gazli ichimlik",
    description: "Mahsulot tavsifi",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ManyToOne((type) => Category, (category_id) => category_id.product)
  @Field((type) => Category)
  @ApiProperty({
    type: () => Category,
    description: "Mahsulotning kategoriya ID si",
  })
  @IsNumber()
  category_id: Category;

  @Field()
  @Column()
  @ApiProperty({ example: "1L", description: "Mahsulot hajmi yoki o'lchami" })
  @IsString()
  @IsNotEmpty()
  size: string;

  @Field()
  @Column()
  @ApiProperty({ example: "1kg", description: "Mahsulot vazni" })
  @IsString()
  @IsNotEmpty()
  weight: string;

  @Field()
  @Column()
  @ApiProperty({
    example: "Suv, shakar, gaz, kofein",
    description: "Tarkibiy qismlar",
  })
  @IsString()
  @IsNotEmpty()
  ingridients: string;

  @Field()
  @Column()
  @ApiProperty({ example: "12000", description: "Narxi so'mda" })
  @IsString()
  @IsNotEmpty()
  price: string;

  @Field()
  @Column()
  @ApiProperty({ example: "12 oy", description: "Yaroqlilik muddati" })
  @IsString()
  @IsNotEmpty()
  shelf_life: string;

  @Field()
  @Column()
  @ApiProperty({ example: true, description: "Mavjudmi yoki yo'q" })
  @IsBoolean()
  @IsNotEmpty()
  is_available: boolean;

  @OneToMany((type) => Storage, (storage) => storage.product_id)
  @Field((type) => [Storage])
  storage: Storage[];

  @OneToMany((type) => Orderitem, (orderitem) => orderitem.product)
  @Field((type) => [Orderitem])
  orderitem: Orderitem[];

  @OneToMany((type) => SavatItem, (savatitem) => savatitem.product_id)
  @Field((type) => [SavatItem])
  savatitem: SavatItem[];

  
    @OneToMany((type) => Sevimli, (sevimli) => sevimli.user_id)
    @Field((type) => [Sevimli])
    sevimli: Sevimli[];

    
      @OneToMany((type) => Review, (review) => review.product_id)
      @Field((type) => [Review])
      review: Review[];
}
