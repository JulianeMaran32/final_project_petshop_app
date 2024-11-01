import { Product } from "../products/product.model";
import { User } from "../user/user.model";

export interface Purchase {
    id: number;
    user: User;
    products: Product[];
    purchaseDate: Date;
}