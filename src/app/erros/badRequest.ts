export class BadRequestError extends Error {
    response?: any;

    constructor(response?: any) {
        super("Requisição inválida.");
        this.name = "BadRequestError";
        this.response = response;
    }
}