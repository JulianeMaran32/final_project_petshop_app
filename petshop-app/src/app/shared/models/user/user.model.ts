import { Role } from "../../enums/role.enum";
import { Address } from "../address/address.model";
import { Pet } from "../pet/pet.model";
import { Purchase } from "../purchase/purchase.model";

export interface User {
    id: number;
    name: string;
    cpf: string;
    email: string;
    password: string;
    phone: string;
    enabled: boolean;
    pets?: Pet[];
    roles?: Role[];
    purchases?: Purchase[];
    addresses?: Address[];
}