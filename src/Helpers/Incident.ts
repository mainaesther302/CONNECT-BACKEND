import Joi from 'joi';

export const IncidentSchema = Joi.object({
    Image: Joi.string().required().messages({
    'any.required': 'Image is required'
  }),
  Title: Joi.string().required().messages({
    'any.required': 'Title is required'
  }),
  Location: Joi.string().required().messages({
    'any.required': 'Location is required'
  }),
  
  Description:Joi.string().required().messages({
    'any.required': 'Description is required'
  }),
  
});
