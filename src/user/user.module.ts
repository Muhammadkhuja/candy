import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { CardsModule } from '../cards/cards.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CardsModule],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports:[UserService, UserResolver]
})
export class UserModule {}
