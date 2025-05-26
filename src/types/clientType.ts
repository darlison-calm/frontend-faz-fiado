export type Client = {
    id: number;
    fullName: string;
    phoneNumber?: string;
    address?: string;
    observation?: string;
}

export type ClientFormData = {
    fullName: string;
    phoneNumber?: string;
    address?: string;
    observation?: string;
}