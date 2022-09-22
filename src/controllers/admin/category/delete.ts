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

  const category = await mongo.fmcg.model(mongo.models.categorys).findOne({
    query: { _id: id },
  });

  if (!category) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.CATEGORY_NOT_FOUND,
    );
  }

  await mongo.fmcg.model(mongo.models.categorys).deleteOne({
    query: { _id: id },
  });

  category.msg = 'category remove successfully!';
  return category; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['admin'],
};

export = exportObject;
