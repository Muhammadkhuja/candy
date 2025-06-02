import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class SelfUserGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const user = req.user
        const paramId = Number(req.params?.id)

        const User = user?.role === "user"
        const IdNum = !isNaN(paramId)
        const Owner = user?.id === paramId

        if(req.user.role !=="user") {
            throw new ForbiddenException({
                message: "Faqat user lar uchun ruxsat"
            })
        }
        if (!user || !User || !IdNum || !Owner) {
          throw new ForbiddenException({
            message: "Faqat o'z profilingizga kirish mumkin",
          });
        }

        return true
    }
}