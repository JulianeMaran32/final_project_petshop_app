export interface AppointmentRequest {
    pet_id: number;
    date: string;
    time: string;
    veterinarian: string;
    description?: string;
}