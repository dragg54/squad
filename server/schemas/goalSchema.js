import Joi from "joi";

export const goalSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    goalPartners: Joi.array()
  });