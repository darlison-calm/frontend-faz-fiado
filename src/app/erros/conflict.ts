export class ConflictError extends Error {
    response: any;


    constructor(response: any) {
        super("Conflito ao processar a solicitação.");
        this.name = "ConflictError";
        this.response = response;
    }
}