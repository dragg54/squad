import { BaseError } from "./BaseError.js";

export class BadRequestError extends BaseError{
    constructor(message){
        super(message, 400)
    }
}