import { ValidationErrors } from "@/types/ValiadationErrosType";
import { AxiosResponse } from "axios";

export class BadRequestError extends Error {
    response?: AxiosResponse<ValidationErrors>

    constructor(response?: AxiosResponse<Record<string, string>>) {
        super("Requisição inválida.");
        this.name = "BadRequestError";
        this.response = response;
    }
}