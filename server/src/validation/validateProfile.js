import Joi from 'joi';
import { ADMIN, COMPANY, STUDENT } from '../constants/roles.js';

const validateUpdateRequest = (role, data) => {
  console.log(role)
  // Define base schema for common fields
  const baseSchema = {
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
  };

  // Define schema for STUDENT-specific fields
  const studentSchema = {
    phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),
  };

  // Define schema for COMPANY-specific fields
  const companySchema = {
    companyName: Joi.string().min(3).max(100).required(),
    companyEmail: Joi.string().email().required(),
    companyPhone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),
  };

  // Combine schemas based on role
  let schema;

  if (role === ADMIN) {
    schema = Joi.object(baseSchema);
  } else if (role === STUDENT) {
    schema = Joi.object({ ...baseSchema, ...studentSchema });
  } else if (role === COMPANY) {
    schema = Joi.object({ ...baseSchema, ...companySchema });
  } else {
    throw new Error(`Invalid role: ${role}`);
  }

  // Validate data against the schema
  const { error } = schema.validate(data);

  if (error) {
    throw new Error(error.message); // Throw validation error
  }

  return data; // Return validated data if no error
};

export default validateUpdateRequest;