import { BaseError } from "./BaseError.js";

export class DuplicateError extends BaseError{
    constructor(message){
        super(message, 409)
    }
}