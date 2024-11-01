import { User } from "../user/user.model";

export interface PasswordResetToken {
    id: number;
    token: string;
    user: User;
    expiry_date: Date;
}