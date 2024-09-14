import Joi from "joi";

export const goalSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    goalPartners: Joi.array(),
    usergoalcategoryId: Joi.number(),
    completed: Joi.boolean()
  });

export const updateGoalSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  goalPartners: Joi.array(),
  usergoalcategoryId: Joi.number(),
  completed: Joi.boolean()
});