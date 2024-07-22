import Joi from 'joi';

export const QuestionSchema = Joi.object({
  PollId: Joi.string().uuid().required(),
  Text: Joi.string().required(),
});
