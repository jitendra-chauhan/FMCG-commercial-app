import joi from 'joi';
import httpStatus from 'http-status';
import mongo from '../../../connection/mongodb';
import ApiError from '../../../utils/ApiError';
import { CUSTOM_MESSAGE } from '../../../constants';

const payload = {
  body: joi.object().keys({
    id: joi.string().required(),
  }),
};

async function handler({ body }) {
  const { id } = body;

  const products = await mongo.fmcg.model(mongo.models.products).findOne({
    query: { _id: id },
  });

  if (!products) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.PRODUCT_NOT_FOUND,
    );
  }

  await mongo.fmcg.model(mongo.models.products).deleteOne({
    query: { _id: id },
  });

  products.msg = 'product remove successfully!';
  return products; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['admin'],
};

export = exportObject;
