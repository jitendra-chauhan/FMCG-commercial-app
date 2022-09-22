import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema(
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
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    status: {
      type: String,
      required: true,
      valid: ['place', 'cancel', 'return', 'completed'],
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

export = ordersSchema;
