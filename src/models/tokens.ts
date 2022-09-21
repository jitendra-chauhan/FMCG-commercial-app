import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      index: true,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    rand: {
      type: String,
      required: false,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export = tokenSchema;
