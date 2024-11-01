import { RoleResponse } from "../role/role-response.model";

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    cpf?: string;
    phone?: string;
    active?: boolean;
    userType?: string;
    roles?: RoleResponse[];
    image?: string;
    bio?: string;
    birthDate?: string;
    country?: string;
}
