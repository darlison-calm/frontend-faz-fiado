export type Client = {
    id: string;
    fullName: string;
    phoneNumber?: string;
    address?: string;
    observation?: string;
}

export type CreateClientData = {
    fullName: string;
    phoneNumber?: string;
    address?: string;
    observation?: string;
}