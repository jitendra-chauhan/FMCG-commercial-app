import joi from 'joi';
import httpStatus from 'http-status';
import mongo from '../../../connection/mongodb';
import ApiError from '../../../utils/ApiError';
import { CUSTOM_MESSAGE } from '../../../constants';
import { brand } from '../../../Interface/product';

const payload = {
  body: joi.object().keys({
    brandName: joi.string().required(),
  }),
};

async function handler({ body }) {
  const { brandName } = body;

  const oldBrand: brand = await mongo.fmcg.model(mongo.models.brands).findOne({
    query: {
      brandName,
    },
    select: { _id: 1 },
  });
  if (oldBrand) {
    // Check for above brand data
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.BRAND_ALREADY_EXISTS,
    );
  }
  const newBrand: brand = await mongo.fmcg
    .model(mongo.models.brands)
    .insertOne({
      // Insert new record
      document: {
        brandName,
      },
    });

  newBrand.msg = 'create brand Name successfully.';
  return newBrand; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['admin'],
};

export = exportObject;
