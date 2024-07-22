import Joi from 'joi';

export const PollSchema = Joi.object({
  
  Title: Joi.string().required(),
  Description: Joi.string().required(),
});
