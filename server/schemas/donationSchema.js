import Joi from "joi";

export const createDonationSchema = Joi.object({
     targetAmount: Joi.number(),
     targetDate: Joi.date().greater("now"),
     reason: Joi.string()
  });

export const postDonationPaymentSchema = Joi.object({
  amount: Joi.number(),
  email: Joi.string(),
  donationId: Joi.number()
});