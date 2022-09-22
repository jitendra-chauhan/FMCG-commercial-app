import joi from 'joi';
import httpStatus from 'http-status';
import mongo from '../../../connection/mongodb';
import ApiError from '../../../utils/ApiError';
import { CUSTOM_MESSAGE } from '../../../constants';
import { category } from '../../../Interface/product';

const payload = {
  body: joi.object().keys({
    catName: joi.string().required(),
  }),
};

async function handler({ body }) {
  const { catName } = body;

  const oldCat: category = await mongo.fmcg
    .model(mongo.models.categorys)
    .findOne({
      query: {
        catName,
      },
      select: { _id: 1 },
    });
  if (oldCat) {
    // Check for above categroy data
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.CATEGORY_ALREADY_EXISTS,
    );
  }
  const newCat: category = await mongo.fmcg
    .model(mongo.models.categorys)
    .insertOne({
      // Insert new record
      document: {
        catName,
      },
    });

  newCat.msg = 'create categroy successfully.';
  return newCat; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['admin'],
};

export = exportObject;
