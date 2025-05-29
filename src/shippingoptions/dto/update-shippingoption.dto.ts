import { InputType, Field } from "@nestjs/graphql";
import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsOptional,
  IsBoolean,
  IsPhoneNumber,
  IsString,
} from "class-validator";

@InputType()
export class UpdateShippingoptionDto {
  @Field({ nullable: true })
  @ApiPropertyOptional({
    example: "FastExpress",
    description: "Yetkazib beruvchi nomi",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    example: "24 soat ichida yetkaziladi",
    description: "Tavsif",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: "10000", description: "Bazaviy narx" })
  @IsOptional()
  @IsString()
  base_price?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: "1000", description: "1 km uchun narx" })
  @IsOptional()
  @IsString()
  price_per_km?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: "100", description: "Maksimal masofa (km)" })
  @IsOptional()
  @IsString()
  max_distance_kn?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    example: "50000",
    description: "Minimal buyurtma miqdori",
  })
  @IsOptional()
  @IsString()
  min_order_amout?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    example: "72 soat",
    description: "Eng ko'p yetkazish vaqti",
  })
  @IsOptional()
  @IsString()
  deliver_time_max?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    example: "24 soat",
    description: "Eng kam yetkazish vaqti",
  })
  @IsOptional()
  @IsString()
  deliver_time_min?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    example: "1-3 kun",
    description: "Taxminiy yetkazish muddati",
  })
  @IsOptional()
  @IsString()
  estimate_days?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: "true", description: "Tracking mavjudligi" })
  @IsOptional()
  @IsString()
  tracing_avabile?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    example: "https://cdn.delivery/logo.png",
    description: "Logotip URL",
  })
  @IsOptional()
  @IsString()
  provider_image?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: "DeliveryX", description: "Kompaniya nomi" })
  @IsOptional()
  @IsString()
  provider_name?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    example: "+998901234567",
    description: "Telefon raqam",
  })
  @IsOptional()
  @IsPhoneNumber("UZ")
  phone?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: true, description: "Xizmat mavjudligi" })
  @IsOptional()
  @IsBoolean()
  is_available?: boolean;
}
