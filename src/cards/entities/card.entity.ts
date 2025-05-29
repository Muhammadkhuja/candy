import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsCreditCard, IsNotEmpty, IsString, Matches } from "class-validator";

@ObjectType()
@Entity()
export class Card {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Kartaning noyob identifikatori" })
  id: number;

  @ManyToOne((type) => User, (user_id) => user_id.cards)
  @Field((type) => User)
  @ApiProperty({
    type: () => User,
    description: "Kartaga tegishli foydalanuvchi",
  })
  user_id: User;

  @Field()
  @Column()
  @ApiProperty({ example: "Visa Platinum", description: "Karta nomi" })
  @IsNotEmpty({ message: "Karta nomi bo'sh bo'lishi mumkin emas" })
  @IsString({ message: "Karta nomi matn bo'lishi kerak" })
  name: string;

  @Field()
  @Column({ unique: true })
  @ApiProperty({ example: "1234 5678 9012 3456", description: "Karta raqami" })
  @IsNotEmpty({ message: "Karta raqami bo'sh bo'lishi mumkin emas" })
  @IsCreditCard({ message: "Karta raqami noto'g'ri formatda" })
  number: string;

  @Field()
  @Column()
  @ApiProperty({ example: "12/26", description: "Karta amal qilish muddati" })
  @IsNotEmpty({ message: "Amal qilish muddati bo'sh bo'lishi mumkin emas" })
  @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Amal qilish muddati 'MM/YY' formatda bo'lishi kerak",
  })
  date: string;
}
