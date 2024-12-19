import Joi from "joi";

export const goalSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    goalPartners: Joi.array(),
    userGoalCategoryId: Joi.number(),
    completed: Joi.boolean(),
    frequency: Joi.string()
  });

export const updateGoalSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  goalPartners: Joi.array(),
  userGoalCategoryId: Joi.number(),
  completed: Joi.boolean(),
  frequency: Joi.string()
});