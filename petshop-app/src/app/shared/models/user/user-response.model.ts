import { AddressResponse } from "../address/address-response.model";
import { RoleResponse } from "../role/role-response.model";

// user-response.model.ts
export interface UserResponse {
    id: number;
    name: string;
    cpf: string;
    email: string;    
    phone: string;
    enabled: boolean;
    roles: RoleResponse[];
    birth_date?: Date;
    addresses?: AddressResponse[];
    profilePic: string; // Adicionando a propriedade profilePic
    petProfilePic: string; // Adicionando a propriedade petProfilePic
}