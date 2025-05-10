import { ValidationErrors } from "@/types/ValiadationErrosType";
import { AxiosResponse } from "axios";

export class ConflictError extends Error {
    response?: AxiosResponse<ValidationErrors>


    constructor(response: AxiosResponse<ValidationErrors>) {
        super("Conflito ao processar a solicitação.");
        this.name = "ConflictError";
        this.response = response;
    }
}