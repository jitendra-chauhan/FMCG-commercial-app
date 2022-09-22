import joi from 'joi';
import httpStatus from 'http-status';
import mongo from '../../../connection/mongodb';
import ApiError from '../../../utils/ApiError';
import { CUSTOM_MESSAGE } from '../../../constants';

const payload = {
  query: joi.object().keys({
    id: joi.string().required(),
  }),
};

async function handler({ query }) {
  const { id } = query;

  const brand = await mongo.fmcg.model(mongo.models.brands).findOne({
    query: { _id: id },
  });

  if (!brand) {
    throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.BRAND_NOT_FOUND);
  }

  await mongo.fmcg.model(mongo.models.brands).deleteOne({
    query: { _id: id },
  });

  brand.msg = 'brand remove successfully!';
  return brand; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['admin'],
};

export = exportObject;
