import Joi from 'joi'; 

const validateSignUp = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),  // Minimum length of 3 for first name
    lastName: Joi.string().min(3).required(),   // Minimum length of 3 for last name
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,64}$'))  // Password pattern: alphanumeric and 6-64 chars
      .required(),
  });

  const { error, value } = schema.validate(data); // Validate the data

  if (error) {
    return { error: error.details.map(err => err.message).join(', ') };  // Return all error messages if validation fails
  }

  return { value };  // If valid, return the value
};

export default validateSignUp;