export interface AddressResponse {
    id: number;
    zip_code: string;
    street?: string;
    neighborhood?: string;
    city?: string;
    complement?: string;
    unit?: string;
    state?: string;
    country?: string;
    user_id?: number;
}