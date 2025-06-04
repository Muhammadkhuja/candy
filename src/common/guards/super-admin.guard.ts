import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class SuperadminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req.user);

    if (!req.user || req.user.role !== "super-admin") {
      throw new ForbiddenException({
        message: "Faqat super admin uchun ruxsat",
      });
    }
    return true;
  }
}
