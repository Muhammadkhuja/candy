import { InputType, Field, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateOrderitemDto {
  @ApiProperty({ example: 10, description: "Buyurtma ID raqami" })
  @IsNotEmpty()
  @IsInt()
  @Field()
  order: number;

  @ApiProperty({ example: 5, description: "Mahsulot ID raqami" })
  @IsNotEmpty()
  @IsInt()
  @Field()
  product: number;

  @ApiProperty({ example: "3", description: "Mahsulot soni (miqdori)" })
  @IsNotEmpty()
  @IsString()
  @Field()
  quantity: string;

  @ApiProperty({ example: "15000", description: "Bir dona mahsulot narxi" })
  @IsNotEmpty()
  @IsString()
  @Field()
  unit_price: string;
}
