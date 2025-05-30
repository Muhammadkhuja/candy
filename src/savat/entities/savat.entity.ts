import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Order } from "../../order/entities/order.entity";
import { SavatItem } from "../../savatitem/entities/savatitem.entity";

@ObjectType()
@Entity()
export class Savat {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Orderning noyob identifikatori" })
  id: number;

  @ManyToOne((type) => User, (user_id) => user_id.savat)
  @Field((type) => User)
  @ApiProperty({
    type: () => User,
    description: "Savat tegishli foydalanuvchi",
  })
  user_id: User;

  @ApiProperty({
    description: "Yaratilgan vaqt",
    example: new Date().toISOString(),
  })
  @Field()
  @CreateDateColumn()
  created_at: Date;

  @OneToMany((type) => Order, (order) => order.savat_id)
  @Field((type) => [Order])
  order: Order[];

  @OneToMany((type) => SavatItem, (savatitem) => savatitem.savat_id)
  @Field((type) => [SavatItem])
  savatitem: SavatItem[];
}