import { BaseError } from "./BaseError.js";

export class NotFoundError extends BaseError{
    constructor(message){
        super(message, 404)
    }
}