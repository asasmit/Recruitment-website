import { Schema, model } from 'mongoose';

import { ADMIN } from '../constants/roles.js';

const AdminSchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: ADMIN,
  }
});

export default model('Admins', AdminSchema);
