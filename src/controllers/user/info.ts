import joi from 'joi';
import httpStatus from 'http-status';
import mongo from '../../connection/mongodb';
import ApiError from '../../utils/ApiError';
import { CUSTOM_MESSAGE } from '../../constants';

const payload = {
  body: joi.object().keys({
  }),
};

async function handler({ user }) {
const { userId } = user
  const userInfo = await mongo.fmcg.model(mongo.models.users).findOne({
    query: { _id: userId },
  });

  if (!userInfo) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.USER_NOT_FOUND,
    );
  }
  userInfo.msg = 'get user Info.';
  return userInfo; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['admin'],
};

export = exportObject;
