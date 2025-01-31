import { Schema, model } from 'mongoose';

import { STUDENT } from '../constants/roles.js';

const StudentSchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
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
    default: STUDENT,
  },
  resume: {
    type: String,
  }
});

export default model('Students', StudentSchema);
