import Joi from "joi";

const passwordSchema = Joi.string()
  .min(8)
  .max(30)
  .pattern(new RegExp('^[a-zA-Z0-9@#$%^&+=!]+$'))
  .required()
  .messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 8 characters long.',
    'string.max': 'Password cannot exceed 30 characters.',
    'string.pattern.base': 'Password must include only letters, numbers, and special characters @#$%^&+=!.',
  });

export const userSchema = Joi.object({
  squadId: Joi.number().required(),
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Please provide a valid email address.',
    }),
  userName: Joi.string().min(3).required(),
  password: passwordSchema,
  token: Joi.string().required(),
  invitedBy: Joi.string().required(),
  bio: Joi.string(),
  birthday: Joi.string(),
  profileAvatar: Joi.string()
});
