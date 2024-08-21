import Joi from "joi";

export const userSchema = Joi.object({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    user_name: Joi.string().min(3).required(),
    password: Joi.string().min(8)
  });
