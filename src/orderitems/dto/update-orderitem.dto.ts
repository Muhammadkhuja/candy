
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { CreateOrderitemDto } from './create-orderitem.dto';
import { Product } from '../../product/entities/product.entity';
import { Order } from '../../order/entities/order.entity';

@InputType()
export class UpdateOrderitemDto extends PartialType(CreateOrderitemDto) {
//   @ApiPropertyOptional({ type: Order, description: "Buyurtma ID raqami" })
//   @IsOptional()
//   @IsInt()
//   @Field( { nullable: false })
//   order?: number;

//   @ApiPropertyOptional({ example: 5, description: "Mahsulot ID raqami" })
//   @IsOptional()
//   @IsInt()
//   @Field( { nullable: false })
//   product?: number;

  @ApiPropertyOptional({ example: "3", description: "Mahsulot soni (miqdori)" })
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  quantity?: string;

  @ApiPropertyOptional({ example: "15000", description: "Bir dona mahsulot narxi" })
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  unit_price?: string;
}
