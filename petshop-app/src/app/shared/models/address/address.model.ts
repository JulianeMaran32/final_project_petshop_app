export interface Address {
    id: number;
    zipCode: string;
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    complement?: string;
    unit?: string;
    state?: string;
    country?: string;
}