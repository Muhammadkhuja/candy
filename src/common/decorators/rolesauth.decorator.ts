import { SetMetadata } from "@nestjs/common"
import { ROLES_KEY } from "app.constnats"




export const Roles = (...role:string[]) => SetMetadata(ROLES_KEY, role)