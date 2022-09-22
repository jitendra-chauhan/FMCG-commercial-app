import mongoose from 'mongoose';

const categorysSchema = new mongoose.Schema(
  {
    catName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export = categorysSchema;
