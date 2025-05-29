import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from "class-validator";

@InputType()
export class CreateShippingoptionDto {
  @Field()
  @ApiProperty({
    example: "FastExpress",
    description: "Yetkazib beruvchi nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @ApiProperty({ example: "24 soat ichida yetkaziladi", description: "Tavsif" })
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @ApiProperty({ example: "10000", description: "Bazaviy narx" })
  @IsString()
  @IsNotEmpty()
  base_price: string;

  @Field()
  @ApiProperty({ example: "1000", description: "1 km uchun narx" })
  @IsString()
  @IsNotEmpty()
  price_per_km: string;

  @Field()
  @ApiProperty({ example: "100", description: "Maksimal masofa (km)" })
  @IsString()
  @IsNotEmpty()
  max_distance_kn: string;

  @Field()
  @ApiProperty({ example: "50000", description: "Minimal buyurtma miqdori" })
  @IsString()
  @IsNotEmpty()
  min_order_amout: string;

  @Field()
  @ApiProperty({ example: "72 soat", description: "Eng ko'p yetkazish vaqti" })
  @IsString()
  @IsNotEmpty()
  deliver_time_max: string;

  @Field()
  @ApiProperty({ example: "24 soat", description: "Eng kam yetkazish vaqti" })
  @IsString()
  @IsNotEmpty()
  deliver_time_min: string;

  @Field()
  @ApiProperty({
    example: "1-3 kun",
    description: "Taxminiy yetkazish muddati",
  })
  @IsString()
  @IsNotEmpty()
  estimate_days: string;

  @Field()
  @ApiProperty({ example: "true", description: "Tracking mavjudligi" })
  @IsString()
  @IsNotEmpty()
  tracing_avabile: string;

  @Field()
  @ApiProperty({
    example: "https://cdn.delivery/logo.png",
    description: "Logotip URL",
  })
  @IsString()
  @IsNotEmpty()
  provider_image: string;

  @Field()
  @ApiProperty({ example: "DeliveryX", description: "Kompaniya nomi" })
  @IsString()
  @IsNotEmpty()
  provider_name: string;

  @Field()
  @ApiProperty({ example: "+998901234567", description: "Telefon raqam" })
  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  phone: string;

  @Field()
  @ApiProperty({ example: true, description: "Xizmat mavjudligi" })
  @IsBoolean()
  @IsNotEmpty()
  is_available: boolean;
}
