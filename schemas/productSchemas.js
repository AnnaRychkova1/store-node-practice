import Joi from "joi";

export const addProductSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
});
