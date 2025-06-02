import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { AdminResolver } from "./admin.resolver";
import { MailModule } from "../common/mail/mail.module";

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), MailModule],
  controllers: [AdminController],
  providers: [AdminService, AdminResolver],
  exports: [AdminService, AdminResolver],
})
export class AdminModule {}
