import { Gender } from "../../enums/gender.enum";
import { Species } from "../../enums/species.enum";

export interface PetResponse {
    id: number;
    name: string;
    species: Species;
    breed?: string;
    birth_date?: Date;
    color?: string;
    size?: string;
    gender: Gender;
    castrated?: boolean;
    weight?: number;
    health_history?: string;
    age?: number;
    created_date?: Date;
    updated_date?: Date;
    userId?: number;
    image?: string;
}