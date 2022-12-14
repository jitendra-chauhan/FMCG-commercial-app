import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      index: true,
      required: true,
      trim: true,
      minlength: 8,
    },
    role: {
      type: String,
      default: 'admin',
    },
  },
  {
    timestamps: true,
  },
);

export = userSchema;
