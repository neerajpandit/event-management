import Joi from 'joi';

// User Registration Schema
const userRegistrationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name must be a string.',
    'string.min': 'Name must be at least 3 characters long.',
    'string.max': 'Name must be at most 50 characters long.',
    'any.required': 'Name is required.',
  }),

  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string.',
    'string.email': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
  }),

  password: Joi.string().min(6).required().messages({
    'string.base': 'Password must be a string.',
    'string.min': 'Password must be at least 6 characters long.',
    'any.required': 'Password is required.',
  }),

  role: Joi.string().valid('0', '1', '2').default('2').messages({
    'string.base': 'Role must be a string.',
    'any.only': 'Role must be one of "admin", "employee", or "user".',
    'any.required': 'Role is required.',
  })
});

// Validation Middleware for User Registration
export const validateUserRegistration = (req, res, next) => {
  const { error } = userRegistrationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};


// Event Creation Schema
const eventCreationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Event name must be a string.',
    'string.min': 'Event name must be at least 3 characters long.',
    'string.max': 'Event name must be at most 100 characters long.',
    'any.required': 'Event name is required.',
  }),

  description: Joi.string().min(5).max(500).required().messages({
    'string.base': 'Event description must be a string.',
    'string.min': 'Event description must be at least 5 characters long.',
    'string.max': 'Event description must be at most 500 characters long.',
    'any.required': 'Event description is required.',
  }),

  date: Joi.date().greater('now').required().messages({
    'date.base': 'Event date must be a valid date.',
    'date.greater': 'Event date must be a future date.',
    'any.required': 'Event date is required.',
  }),

  location: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Event location must be a string.',
    'string.min': 'Event location must be at least 3 characters long.',
    'string.max': 'Event location must be at most 100 characters long.',
    'any.required': 'Event location is required.',
  }),

  category: Joi.string().valid('conference', 'workshop', 'party', 'seminar').required().messages({
    'string.base': 'Event category must be a string.',
    'any.only': 'Event category must be one of "conference", "workshop", "party", or "seminar".',
    'any.required': 'Event category is required.',
  }),

  createdBy: Joi.string().required().messages({
    'string.base': 'Created by field must be a string (User ID).',
    'any.required': 'Created by is required.',
  })
});

// Validation Middleware for Event Creation
export const validateEventCreation = (req, res, next) => {
  const { error } = eventCreationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};
