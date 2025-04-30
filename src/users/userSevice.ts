import { apiFetch } from "@/utils/api";
import { TAuthUSer, TCreateUser } from "@/users/types/userTypes";

export class UserService {
    static async createUser(data: TCreateUser) {
        return apiFetch("/users/registration", {
            method: "POST",
            body: JSON.stringify(data)
        });
    }

    static async authUser(data: TAuthUSer) {
        return apiFetch("/users/auth", {
            method: "POST",
            body: JSON.stringify(data)
        });
    }

    static async getClients(token: string, options?: RequestInit) {
        return apiFetch("/users/clients", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            ...options
        })
    }
}
