import joi from 'joi';
import httpStatus from 'http-status';
import mongo from '../../../connection/mongodb';
import ApiError from '../../../utils/ApiError';
import { CUSTOM_MESSAGE } from '../../../constants';
import { product } from '../../../Interface/product';

const payload = {
  body: joi.object().keys({
    id: joi.string().required(),
    catId: joi.string().optional(),
    brandId: joi.string().optional(),
    name: joi.string().optional(),
    price: joi.number().optional(),
    item: joi.number().optional(),
  }),
};

async function handler({ body }) {
  const { id, catId, brandId, name, price, item } = body;

  const query = {
    _id: id,
  };
  const productsInfo: product = await mongo.fmcg
    .model(mongo.models.products)
    .findOne({
      query,
    });
  if (!productsInfo) {
    throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.BRAND_NOT_FOUND);
  }
  const newproductsInfo: product = await mongo.fmcg
    .model(mongo.models.brands)
    .updateOne({
      query,
      update: {
        catId,
        brandId,
        name,
        price,
        item,
      },
    });

  newproductsInfo.msg = 'update product successfully.';
  return newproductsInfo; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['admin'],
};

export = exportObject;
