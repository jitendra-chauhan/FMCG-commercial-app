import joi from 'joi';
import httpStatus from 'http-status';
import mongo from '../../../connection/mongodb';
import ApiError from '../../../utils/ApiError';
import { CUSTOM_MESSAGE } from '../../../constants';
import { product } from '../../../Interface/product';

const payload = {
  body: joi.object().keys({
    catId: joi.string().required(),
    brandId: joi.string().required(),
    name: joi.string().required(),
    price: joi.number().required(),
    item: joi.number().required(),
  }),
};

async function handler({ body }) {
  const { catId, brandId, name, price, item } = body;

  const brandInfo: product = await mongo.fmcg
    .model(mongo.models.brands)
    .findOne({
      query: {
        _id: brandId,
      },
      select: { _id: 1 },
    });
  if (!brandInfo) {
    // Check for above brand data
    throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.BRAND_NOT_FOUND);
  }

  let catInfo: product = await mongo.fmcg
    .model(mongo.models.categorys)
    .findOne({
      query: {
        _id: catId,
      },
      select: { _id: 1 },
    });
  if (!catInfo) {
    // Check for above cat data
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.CATEGORY_NOT_FOUND,
    );
  }
  let newBrand: product = await mongo.fmcg
    .model(mongo.models.products)
    .insertOne({
      // Insert new record
      document: {
        catId,
        brandId,
        name,
        price,
        item,
      },
    });

  newBrand.msg = 'create product successfully.';
  return newBrand; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['admin'],
};

export = exportObject;
