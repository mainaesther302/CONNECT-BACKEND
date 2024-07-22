import Joi from 'joi';

export const ViewSchema = Joi.object({
  
    Image: Joi.string().required().messages({
    'any.required': 'Image is required'
  }),
  
  Description:Joi.string().required().messages({
    'any.required': 'Description is required'
  }),
  
});
