import joi from 'joi';
import httpStatus from 'http-status';
import mongo from '../../connection/mongodb';
import ApiError from '../../utils/ApiError';
import auth from '../../utils/auth';
import config from '../../config';
import { CUSTOM_MESSAGE } from '../../constants';
import { adminUserIf } from '../../Interface/admin';

const payload = {
  body: joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
  }),
};

interface login {
  email: string;
  password: string;
}

async function handler({ body }) {
  let { email, password }: login = body;

  let userInfo: adminUserIf = await mongo.fmcg
    .model(mongo.models.admins)
    .findOne({
      // Find admin data
      query: {
        email,
      },
    });
  if (!userInfo) {
    // Check for above admin data
    throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.USER_NOT_FOUND);
  }
  if (userInfo.password != password) {
    // Compair password
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.PASSWORD_NOT_MATCH,
    );
  }
  userInfo.msg = 'Login successfully.';
  let milisecTime =
    Number(config.jwt.withoutReminderUserLoginExpirationHours) * 60 * 60 * 100;

  const tokens = await auth.generateToken(
    userInfo,
    { expiresIn: milisecTime },
    'access',
  ); // Generate new token

  userInfo.token = tokens.token;

  return userInfo; // Return response
}

const exportObject = {
  payload,
  handler,
};

export = exportObject;
