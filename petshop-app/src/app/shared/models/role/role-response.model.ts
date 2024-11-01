import { Role } from "../../enums/role.enum";

export interface RoleResponse {
    id: number;
    name: Role;
    description: string;
}