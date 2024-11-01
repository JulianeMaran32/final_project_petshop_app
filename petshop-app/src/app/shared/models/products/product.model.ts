import { Purchase } from "../purchase/purchase.model";
import { Dimensions } from "./dimensions.model";

export interface Product {

    id: number;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    category?: string;
    supplier?: string;
    expirationDate?: Date;
    barcode?: string;
    imageUrl?: string;
    weight?: number;
    dimension?: Dimensions;
    purchase?: Purchase[];

}