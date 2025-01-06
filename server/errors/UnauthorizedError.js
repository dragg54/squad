import { BaseError } from "./BaseError.js";

export class UnauthorizedError extends BaseError{
    constructor(message){
        super(message, 403)
    }
}