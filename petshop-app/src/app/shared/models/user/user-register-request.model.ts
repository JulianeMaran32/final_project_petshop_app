export interface UserRegistrationRequest {
    name: string;
    cpf: string;
    email: string;
    phone: string;
    password: string;
    confirm_password: string;
    userType: "CUSTOMER" | "OWNER";
}