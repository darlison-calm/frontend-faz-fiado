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
}
