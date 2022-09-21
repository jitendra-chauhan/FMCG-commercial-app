import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config';
import mongo from '../connection/mongodb';
import { sercurDataSign, tokens, updateData } from '../Interface/utils';
import ApiError from './ApiError';
import { CUSTOM_MESSAGE } from '../constants';

function sign(payload, option) {
  return new Promise((resolve) => {
    let sercurData: sercurDataSign = {
      userId: payload._id,
      email: payload.email,
      type: payload.tokenType,
      role: payload.agent_level,
    };
    if (payload.rand) {
      sercurData.rand = payload.rand;
    }

    jwt.sign(sercurData, config.jwt.secret, option, (error, token) => {
      resolve({ error, token });
    });
  });
}
const generateToken = async (payload, option, type) => {
  payload.tokenType = type;
  const tokens: any = await sign(payload, option);
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes',
  );
  await saveToken(tokens.token, payload._id, accessTokenExpires, payload);
  return tokens;
};
const generateTokenForUsers = async (payload, option, type) => {
  payload.tokenType = payload.type; //type;
  const tokens: any = await sign(payload, option);
  const accessTokenExpires = moment().add(100000000, 'minutes');
  await saveToken(tokens.token, payload._id, accessTokenExpires, payload);
  return tokens;
};

const saveToken = async (token, userId, expires, payload: any) => {
  let updateData: updateData = {
    userId: userId,
    token: token,
    expires: expires,
    type: payload.tokenType,
  };
  if (payload.rand) {
    updateData.rand = payload.rand;
  }
  let tokenDoc;
  if (payload.type == 'access') {
    tokenDoc = await mongo.insertOne({
      db: mongo.masterDb(),
      model: mongo.models.tokens,
      document: updateData,
    });
  } else {
    tokenDoc = await mongo.findOneAndUpdate({
      db: mongo.masterDb(),
      model: mongo.models.tokens,
      query: {
        userId: userId,
        type: payload.type,
      },
      update: updateData,
      options: {
        upsert: true,
        new: true,
      },
    });
  }
  return tokenDoc;
};

function verify(token) {
  return new Promise((resolve) => {
    jwt.verify(token, config.jwt.secret, (error, decoded) => {
      resolve({ error, decoded });
    });
  });
}

async function authMiddleware(req, res, next) {
  let authToken = req.headers['authorization']
    ? req.headers['authorization'].replace('Bearer ', '')
    : null;
  if (!authToken) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized1');
  }
  if (authToken.length < 26) {
    let gettokenFormDb = await mongo.bettingApp
      .model(mongo.models.tokens)
      .findOne({
        query: { _id: new mongo.ObjectId(authToken) },
        select: { token: 1 },
      });
    authToken = gettokenFormDb.token;
  }
  // var { decoded, error }: any = await verify(authToken, config.jwt.secret);
  var { decoded, error }: any = await verify(authToken);
  if (
    error ||
    !decoded ||
    !decoded.exp ||
    new Date(decoded.exp * 1000).getTime() < new Date().getTime()
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized2');
  }
  // console.log("::: decoded :: ");
  // console.log(decoded);
  // console.log(" :: authToken :::: ");
  // console.log(authToken);
  let tokenDoc = await mongo.findOne({
    db: mongo.masterDb(),
    model: mongo.models.tokens,
    query: {
      userId: decoded.userId,
      type: decoded.type,
      token: authToken,
    },
  });
  if (!tokenDoc) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized3');
  }
  if (new Date(tokenDoc.expires).getTime() < new Date().getTime()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized4');
  }

  console.log(decoded);
  req.user = {
    userId: decoded.userId,
    email: decoded.email,
    role: decoded.role,
  };
  if (decoded.gameId) {
    req.user.gameId = decoded.gameId;
  }
}
const resetPasswordVerify = async (payload) => {
  // var { decoded, error }: any = await verify(payload.token, config.jwt.secret);
  var { decoded, error }: any = await verify(payload.token);

  if (
    error ||
    !decoded ||
    !decoded.exp ||
    new Date(decoded.exp * 1000).getTime() < new Date().getTime()
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized2');
  }
  let query = {
    userId: decoded.userId,
    type: decoded.type,
    token: payload.token,
  };
  let tokenDoc = await mongo.findOne({
    db: mongo.masterDb(),
    model: mongo.models.tokens,
    query: query,
  });
  if (!tokenDoc) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Link expired.');
  }

  if (new Date(tokenDoc.expires).getTime() < new Date().getTime()) {
    await mongo.deleteOne({
      db: mongo.masterDb(),
      model: mongo.models.tokens,
      query: query,
    });
    throw new ApiError(httpStatus.BAD_REQUEST, 'Link expired.');
  }
  let user = {
    userId: decoded.userId,
    email: decoded.email,
    id: decoded._id,
  };
  return user;
};

async function decodeHeader(req) {
  let authToken = req.headers['authorization']
    ? req.headers['authorization'].replace('Bearer ', '')
    : null;
  // var { decoded, error }: any = await verify(authToken, config.jwt.secret);
  var { decoded, error }: any = await verify(authToken);
  if (decoded && decoded.is_Block) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.SDK_USER_YOU_BLOCKED_BY_SUPERADMIN,
    );
  }
  if (decoded) {
    return (req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    });
  }
  return (req.user = {});
}

async function passwordValidation(password) {
  if (password.length >= 8) {
    if (!/[A-Z]/.test(password))
      return { flag: true, msg: 'At least one upper case letter required' };
    if (!/[a-z]/.test(password))
      return { flag: true, msg: 'At least one lower case letter required' };
    if (!/\d/.test(password))
      return { flag: true, msg: 'At least one numeric value required' };
    if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password))
      return {
        flag: true,
        msg: 'At least one special character (eg. &@*#!) required',
      };

    return { flag: false, msg: '' };
  } else {
    return {
      flag: true,
      msg: 'Password length must be greater than or equal to 8',
    };
  }
}

const exportObject = {
  generateToken,
  verify,
  authMiddleware,
  resetPasswordVerify,
  generateTokenForUsers,
  decodeHeader,
  passwordValidation,
};

export = exportObject;
