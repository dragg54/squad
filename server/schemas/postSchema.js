import Joi from "joi";

export const postSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    parentPostId: Joi.number().optional()
  });

export const updatePostSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
});