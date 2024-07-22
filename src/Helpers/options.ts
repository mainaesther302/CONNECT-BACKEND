import Joi from 'joi';

export const OptionSchema = Joi.object({
  QuestionId: Joi.string().uuid().required(),
  Text: Joi.string().required(),
});
