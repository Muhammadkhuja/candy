import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Savat } from "../../savat/entities/savat.entity";
import { Product } from "../../product/entities/product.entity";

@ObjectType()
@Entity("savat_items")
export class SavatItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "SavatItemning noyob IDsi" })
  id: number;

  @Field()
  @Column()
  @ApiProperty({ example: 2, description: "Mahsulot soni (miqdori)" })
  quantity: number;

  @Field()
  @Column()
  @ApiProperty({ example: 15000, description: "Bir dona mahsulot narxi" })
  unit_price: number;

    @ApiProperty({
      description: "Yaratilgan vaqt",
      example: new Date().toISOString(),
    })
    @Field()
    @CreateDateColumn()
    added_at: Date;

  @ManyToOne(() => Savat, (savat_id) => savat_id.savatitem)
  @Field(() => Savat)
  @ApiProperty({ type: () => Savat, description: "Qaysi savatga tegishli" })
  savat_id: Savat;

  @ManyToOne(() => Product, (product_id) => product_id.savatitem)
  @Field(() => Product)
  @ApiProperty({ type: () => Product, description: "Mahsulot IDsi" })
  product_id: Product;
}
