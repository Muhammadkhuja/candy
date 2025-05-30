import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../order/entities/order.entity";
import { Product } from "../../product/entities/product.entity";

@ObjectType()
@Entity()
export class Orderitem {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Orderning noyob identifikatori" })
  id: number;

  @Field()
  @Column()
  @ApiProperty({ example: "3", description: "Mahsulot soni (miqdori)" })
  quantity: string;

  @Field()
  @Column()
  @ApiProperty({ example: "15000", description: "Bir dona mahsulot narxi" })
  unit_price: string;

  @ManyToOne((type) => Order, (order) => order.orderitem)
  @Field((type) => Order)
  @ApiProperty({ type: Order, description: "Buyurtma ID raqami" })
  order: Order;

  @ManyToOne((type) => Product, (product) => product.orderitem)
  @Field((type) => Product)
  @ApiProperty({ type: Product, description: "Mahsulot ID raqami" })
  product: Product;
}
