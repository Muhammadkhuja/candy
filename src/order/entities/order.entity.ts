import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";
import { Shippingoption } from "../../shippingoptions/entities/shippingoption.entity";
import { Orderitem } from "../../orderitems/entities/orderitem.entity";
import { Savat } from "../../savat/entities/savat.entity";

@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Orderning noyob identifikatori" })
  id: number;

  @ApiProperty({ example: "2025-05-29", description: "Buyurtma sanasi" })
  @Field()
  @Column()
  @IsString()
  @IsNotEmpty({ message: "Buyurtma sanasi bo'sh bo'lishi mumkin emas" })
  order_date: string;

  @ApiProperty({ example: "250000", description: "Buyurtma umumiy summasi" })
  @Field()
  @Column()
  @IsString()
  @IsNotEmpty({ message: "Summasi bo'sh bo'lishi mumkin emas" })
  total_amout: string;

  @ApiProperty({ example: "Naqd", description: "To'lov usuli" })
  @Field()
  @Column()
  @IsString()
  @IsNotEmpty({ message: "To'lov usuli bo'sh bo'lmasligi kerak" })
  payment_method: string;

  @ApiProperty({ example: "to'landi", description: "To'lov holati" })
  @Field()
  @Column()
  @IsString()
  @IsNotEmpty({ message: "To'lov holati bo'sh bo'lmasligi kerak" })
  payment_status: string;

  @ApiProperty({
    example: "Toshkent shahri, Chilonzor tumani, 12-kvartal",
    description: "Yetkazib berish manzili",
  })
  @Field()
  @Column()
  @IsString()
  @IsNotEmpty({ message: "Manzil bo'sh bo'lmasligi kerak" })
  shipping_address: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @Field()
  @Column()
  @IsString()
  @IsNotEmpty({ message: "Telefon raqam bo'sh bo'lishi mumkin emas" })
  phone: string;

  @ApiProperty({ example: "Eshikni taqillatmang", description: "Izoh" })
  @Field()
  @Column()
  @IsString()
  @IsNotEmpty({ message: "Izoh bo'sh bo'lishi mumkin emas" })
  note: string;

    @ManyToOne((type)=> Savat, (savat_id)=> savat_id.order)
    @IsNumber()
    @Field((type) => Savat)
    @ApiProperty({ type: () => Savat, description: "Savat ID raqami" })
    savat_id: Savat;

  @ManyToOne((type) => User, (user_id) => user_id.order)
  @Field((type) => User)
  @ApiProperty({
    type: () => User,
    description: "Order tegishli foydalanuvchi",
  })
  user_id: User;

  @ManyToOne(
    (type) => Shippingoption,
    (shippingoption_id) => shippingoption_id.order1
  )
  @Field((type) => Shippingoption)
  @ApiProperty({
    type: () => Shippingoption,
    description: "Yetkazib berish opsiyasi ID raqami",
  })
  shippingoption_id: Shippingoption;

    @OneToMany((type) => Orderitem, (orderitem) => orderitem.order)
    @Field((type) => [Orderitem])
    orderitem: Orderitem[];
}
