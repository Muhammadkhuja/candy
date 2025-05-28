import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { AdminResolver } from "./admin.resolver";
import { User } from "../user/entities/user.entity";
import { UserController } from "../user/user.controller";
import { UserService } from "../user/user.service";
import { UserResolver } from "../user/user.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminService, AdminResolver],
  exports: [AdminService, AdminResolver],
})
export class AdminModule {}
