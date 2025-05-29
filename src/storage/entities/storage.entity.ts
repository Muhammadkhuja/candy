import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, ValidateNested } from "class-validator";

@ObjectType()
@Entity()
export class Storage {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty({ example: 1, description: "Unikal ombor ID raqami" })
  id: number;

  @Field()
  @Column()
  @ApiProperty({ example: 150, description: "Ombordagi mahsulot soni" })
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @Field()
  @Column()
  @ApiProperty({ example: "2025-05-29", description: "Oxirgi kirim sanasi" })
  @IsString()
  @IsNotEmpty()
  last_stoked: string;

  @Field()
  @Column()
  @ApiProperty({
    example: 20,
    description: "Minimal daraja (xavf belgisi uchun)",
  })
  @IsInt()
  @IsNotEmpty()
  min_level: number;

  @ManyToOne(() => Product, (product) => product.storage)
  @Field(() => Product)
  @ApiProperty({ type: () => Product, description: "Bog'langan mahsulot" })
  @ValidateNested()
  @IsNotEmpty()
  product_id: Product;
}
