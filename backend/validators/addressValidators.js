import Joi from 'joi'

export const locationSchema = Joi.object({
  source: Joi.string().trim().min(2).required().messages({
    'string.empty': 'Source address is required',
    'string.min': 'Source address must be at least 2 characters',
  }),
  destination: Joi.string().trim().min(2).required().messages({
    'string.empty': 'Destination address is required',
    'string.min': 'Destination address must be at least 2 characters',
  }),
})
