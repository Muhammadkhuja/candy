import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class SelfAdminGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const user = req.user
        const paramId = Number(req.params?.id)

        const Admin = user?.role === "admin"
        const IdNum = !isNaN(paramId)
        const Owner = user?.id === paramId

        if(req.user.role !=="admin") {
            throw new ForbiddenException({
                message: "Faqat admin lar uchun ruxsat"
            })
        }
        if (!user || !Admin || !IdNum || !Owner) {
          throw new ForbiddenException({
            message: "Faqat o'z profilingizga kirish mumkin",
          });
        }

        return true
    }
}