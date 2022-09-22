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

  const cat = await mongo.fmcg.model(mongo.models.categorys).findOne({
    query: { _id: id },
  });

  if (!cat) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.CATEGORY_NOT_FOUND,
    );
  }
  cat.msg = 'get categroy Info.';
  return cat; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['admin'],
};

export = exportObject;
