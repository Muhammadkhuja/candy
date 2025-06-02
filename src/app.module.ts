import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { CardsModule } from './cards/cards.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { StorageModule } from './storage/storage.module';
import { ShippingoptionsModule } from './shippingoptions/shippingoptions.module';
import { OrderModule } from './order/order.module';
import { OrderitemsModule } from './orderitems/orderitems.module';
import { SavatModule } from './savat/savat.module';
import { SavatitemModule } from './savatitem/savatitem.module';
import { SevimliModule } from './sevimli/sevimli.module';
import { ReviewsModule } from './reviews/reviews.module';
import { MailModule } from './common/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<"postgres">("DB_CONNECTION"),
        host: config.get<string>("DB_HOST"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        port: config.get<number>("DB_PORT"),
        database: config.get<string>("DB_NAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
      }),
    }),
    AdminModule,
    AuthModule,
    UserModule,
    CardsModule,
    CategoryModule,
    ProductModule,
    StorageModule,
    ShippingoptionsModule,
    OrderModule,
    OrderitemsModule,
    SavatModule,
    SavatitemModule,
    SevimliModule,
    ReviewsModule,
    MailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
