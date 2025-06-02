import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class UserGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()

        if(!req.user || req.user.role !=="user") {
            throw new ForbiddenException({
                message: "Faqat user lar uchun ruxsat"
            })
        }
        return true
    }
}