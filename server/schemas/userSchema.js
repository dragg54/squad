import Joi from "joi";

export const userSchema = Joi.object({
    squadId: Joi.number().required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    userName: Joi.string().min(3).required(),
    password: Joi.string().min(8),
    sex: Joi.string().required(),
    token: Joi.string().required(),
    invitedBy: Joi.string().required(),
    profileAvatar: Joi.string()
  });
