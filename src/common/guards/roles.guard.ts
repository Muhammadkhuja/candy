import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "app.constnats";

@Injectable()
export class JwtRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  //   canActivate(
  //     context: ExecutionContext
  //   ): boolean | Promise<boolean> | Observable<boolean> {
  //     const req = context.switchToHttp().getRequest();

  //     const requiredRoles = this.reflector.getAllAndOverride<string[]>(
  //       ROLES_KEY,
  //       [context.getHandler(), context.getClass()]
  //     );
  //     if (!requiredRoles) {
  //       return true;
  //     }

  //     const userRole = req.user.role;
  //     const role = Array.isArray(userRole) ? userRole : [userRole];

  //     const permession = role.some((role: any) => requiredRoles.includes(role));

  //     if (!permession) {
  //       throw new ForbiddenException({
  //         message: "Ruxsat etilmagan rol",
  //       });
  //     }

  //     return true;
  //   }
  // }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles) {
      return true;
    }

    const user = req.user; // user ma'lumotlarini olish
    if (!user || !user.role) {
      console.log(user);
      console.log(user.role);
      throw new ForbiddenException({
        
        message: "Foydalanuvchining roli mavjud emas",
      });
    }

    const userRole = user.role;
    const roles = Array.isArray(userRole) ? userRole : [userRole];

    const hasPermission = roles.some((role) => requiredRoles.includes(role));

    if (!hasPermission) {
      throw new ForbiddenException({
        message: "Ruxsat etilmagan rol",
      });
    }

    return true;
  }
}
