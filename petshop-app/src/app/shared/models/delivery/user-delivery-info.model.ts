export interface UserDeliveryInfo {
  userId?: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  zipCode: string;
  street?: string;
  neighborhood?: string;  
  city?: string;
  complement?: string;
  unit?: string;
  state?: string;
  country?: string;
}