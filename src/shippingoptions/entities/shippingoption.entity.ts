import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
} from "class-validator";
import { Order } from "../../order/entities/order.entity";
import { Orderitem } from "../../orderitems/entities/orderitem.entity";

@ObjectType()
@Entity()
export class Shippingoption {
  @Field()
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Unikal ID (avtomatik yaratiladi)" })
  id: number;

  @Field()
  @Column()
  @ApiProperty({
    example: "FastExpress",
    description: "Yetkazib beruvchi nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @Column()
  @ApiProperty({
    example: "24 soat ichida yetkaziladi",
    description: "Tavsif (description)",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @Column()
  @ApiProperty({ example: "10000", description: "Bazaviy narx (start narxi)" })
  @IsString()
  @IsNotEmpty()
  base_price: string;

  @Field()
  @Column()
  @ApiProperty({ example: "1000", description: "1 km uchun qo'shimcha narx" })
  @IsString()
  @IsNotEmpty()
  price_per_km: string;

  @Field()
  @Column()
  @ApiProperty({ example: "100", description: "Maksimal masofa (km)" })
  @IsString()
  @IsNotEmpty()
  max_distance_kn: string;

  @Field()
  @Column()
  @ApiProperty({ example: "50000", description: "Minimal buyurtma summasi" })
  @IsString()
  @IsNotEmpty()
  min_order_amout: string;

  @Field()
  @Column()
  @ApiProperty({ example: "72 soat", description: "Eng ko'p yetkazish vaqti" })
  @IsString()
  @IsNotEmpty()
  deliver_time_max: string;

  @Field()
  @Column()
  @ApiProperty({ example: "24 soat", description: "Eng kam yetkazish vaqti" })
  @IsString()
  @IsNotEmpty()
  deliver_time_min: string;

  @Field()
  @Column()
  @ApiProperty({
    example: "1-3 kun",
    description: "Taxminiy yetkazish muddati",
  })
  @IsString()
  @IsNotEmpty()
  estimate_days: string;

  @Field()
  @Column()
  @ApiProperty({
    example: "true",
    description: "Tracking mavjudligi (true/false sifatida)",
  })
  @IsString()
  @IsNotEmpty()
  tracing_avabile: string;

  @Field()
  @Column()
  @ApiProperty({
    example: "https://cdn.delivery/logo.png",
    description: "Yetkazib beruvchi logotipi URL manzili",
  })
  @IsString()
  @IsNotEmpty()
  provider_image: string;

  @Field()
  @Column()
  @ApiProperty({
    example: "DeliveryX",
    description: "Yetkazib beruvchi kompaniya nomi",
  })
  @IsString()
  @IsNotEmpty()
  provider_name: string;

  @Field()
  @Column()
  @ApiProperty({
    example: "+998901234567",
    description: "Kompaniya telefon raqami",
  })
  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  phone: string;

  @Field()
  @Column()
  @ApiProperty({ example: true, description: "Hozirda mavjud yoki yo'qligi" })
  @IsBoolean()
  @IsNotEmpty()
  is_available: boolean;

  @OneToMany((type) => Order, (order1) => order1.shippingoption_id)
  @Field((type) => [Order])
  order1: Order[];

}
