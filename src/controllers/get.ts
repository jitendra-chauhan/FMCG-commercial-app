import joi from 'joi';
import httpStatus from 'http-status';

import mongo from '../connection/mongodb';
import ApiError from '../utils/ApiError';
// import auth from '../utils/auth';
import { CUSTOM_MESSAGE } from '../constants';

const payload = {
  body: joi.object().keys({}),
};

async function handler({ user }) {
  const { role } = user;

  console.log(role);
  let userRole = await mongo.fmcg.model(mongo.models.roles).findOne({
    query: {
      name: role,
    },
    select: {
      _id: 0,
    },
  });
  if (!userRole)
    // Check for above
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.USER_ROLE_DETAILS_NOT_FOUND,
    );

  userRole.msg = 'user role details.';
  return userRole; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
};

export = exportObject;
