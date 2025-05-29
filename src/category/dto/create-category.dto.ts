// dto/create-category.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

@InputType()
export class CreateCategoryDto {
  @ApiProperty({ example: 'Texnika', description: 'Kategoriya nomi' })
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @ApiProperty({ example: 'https://cdn.site.com/image.jpg', description: 'Kategoriya rasmi URL' })
  @IsString()
  @IsNotEmpty()
  @Field()
  image: string;

  @ApiProperty({ example: 'Texnikalar uchun kategoriya', description: 'Kategoriya tavsifi' })
  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;
}
