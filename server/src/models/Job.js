import { Schema, model } from 'mongoose';

const JobSchema = Schema({
  _companyId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  applicants: {
    type: Array,
    default: [],
  }
});

export default model('Jobs', JobSchema);
