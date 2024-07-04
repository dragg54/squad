import { BaseError } from "./BaseError.js";

export class InternalServerError extends BaseError{
    constructor(message){
        super(message, 500)
    }
}