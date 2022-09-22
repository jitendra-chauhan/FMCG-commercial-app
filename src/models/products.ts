import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema(
  {
    catId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categorys',
      required: true,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    item: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export = productsSchema;
