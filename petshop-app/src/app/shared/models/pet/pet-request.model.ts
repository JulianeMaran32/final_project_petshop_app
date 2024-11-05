import { Gender } from "../../enums/gender.enum";
import { Species } from "../../enums/species.enum";

export interface PetRequest {
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
  userId?: number;
  image?: string;
}