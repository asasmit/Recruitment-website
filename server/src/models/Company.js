import { Schema, model } from 'mongoose';

import { COMPANY } from '../constants/roles.js';

const CompanySchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    default: '',
  },
  companyEmail: {
    type: String,
    unique: true,
    default: '',
  },
  companyPhone: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: COMPANY,
  }
});

export default model('Companies', CompanySchema);
