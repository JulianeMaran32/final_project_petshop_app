export interface UserRegistrationRequest {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  confirm_password: string;
  role: string;
}