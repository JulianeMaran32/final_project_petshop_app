export interface AppointmentResponse {
    id: number;
    pet_id: number;
    date: string;
    time: string;
    veterinarian: string;
    description?: string;
}