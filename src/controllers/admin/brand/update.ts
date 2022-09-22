import joi from 'joi';
import httpStatus from 'http-status';
import mongo from '../../../connection/mongodb';
import ApiError from '../../../utils/ApiError';
import { CUSTOM_MESSAGE } from '../../../constants';
import { brand } from '../../../Interface/product';

const payload = {
  body: joi.object().keys({
    id: joi.string().required(),
    brandName: joi.string().required(),
  }),
};

async function handler({ body }) {
  const { id, brandName } = body;

  const query = {
    _id: id,
  };
  const brandInfo: brand = await mongo.fmcg.model(mongo.models.brands).findOne({
    query,
  });
  if (!brandInfo) {
    throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.BRAND_NOT_FOUND);
  }
  const newbrandInfo: brand = await mongo.fmcg
    .model(mongo.models.brands)
    .updateOne({
      query,
      update: {
        brandName,
      },
    });

  newbrandInfo.msg = 'update brandName successfully.';
  return newbrandInfo; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['admin'],
};

export = exportObject;
