import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserController } from '../user/user.controller';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    AdminModule, UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
