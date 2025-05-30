import { Module } from '@nestjs/common';
import { SavatService } from './savat.service';
import { SavatController } from './savat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Savat } from './entities/savat.entity';
import { User } from '../user/entities/user.entity';
import { SavatResolver } from './savat.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Savat, User])],
  controllers: [SavatController],
  providers: [SavatService, SavatResolver],
  exports: [SavatService, SavatResolver],
})
export class SavatModule {}
