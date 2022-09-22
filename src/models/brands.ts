import mongoose from 'mongoose';

const brandsSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export = brandsSchema;
