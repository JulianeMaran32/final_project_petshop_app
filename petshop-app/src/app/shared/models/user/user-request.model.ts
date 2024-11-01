export interface UserRequest {
    name: string;
    cpf: string;
    phone?: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}
