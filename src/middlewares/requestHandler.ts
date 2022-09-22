import httpStatus from 'http-status';

import pick from '../utils/pick';
import joiValidate from '../utils/joiValidate';
import ApiError from '../utils/ApiError';
import auth from '../utils/auth';
import { CUSTOM_MESSAGE } from '../constants';
// import config from '../config';
// import crypto from "crypto";
// import { ObjectId } from '../connection/mongodb';
// import CryptoJS from 'crypto-js';
// const cryptLib = require("@skavinvarnan/cryptlib");

const handleAPICall = (controller) => async (req, res, next) => {
  try {
    var ip;
    if (req.headers['x-forwarded-for']) {
      // console.log('req.headers["x-forwarded-for"] :: ',req.headers["x-forwarded-for"]);
      ip = req.headers['x-forwarded-for'].split(',')[0];
    } else if (req.connection && req.connection.remoteAddress) {
      // console.log("req.connection.remoteAddress :: ",req.connection.remoteAddress);
      ip = req.connection.remoteAddress;
    } else {
      // console.log("req.ip :: ",req.ip);
      ip = req.ip;
    }

    if (controller.auth) {
      await auth.authMiddleware(req, res, next);
    }
    if (controller.payload) {
      const validSchema = pick(controller.payload, ['params', 'query', 'body']);
      const object = pick(req, Object.keys(validSchema));

      const { value, error, errorMessage } = joiValidate(validSchema, object);
      let stack = '';
      if (error && error.details[0].type === 'string.email') {
        stack = 'email';
      }
      if (error)
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage, stack));
    }
    if (controller.handler) {
      if (!controller.auth && req.headers['authorization']) {
        let authToken = await auth.decodeHeader(req);
        if (authToken) {
          req.user.userId = req.user.userId;
          req.user.role = req.user.role;
        }
      }
      if (controller.role && controller.role.indexOf(req.user.role) === -1)
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          CUSTOM_MESSAGE.YOU_ARE_NOT_AUTHORIZE,
        );
      req.user = req.user || {};

      req.user.requestIP = ip;
      let response = await controller.handler(req, res);
      let sendData = {
        statusCode: 200,
        message: 'success',
        data: response,
      };
      if (response.msg) {
        sendData.message = response.msg;
        delete sendData.data.msg;
        // delete response;
      }
      res.send(sendData);
    } else {
      next();
    }
  } catch (err: any) {
    console.log('err.toString() : ', err);
    next(
      err instanceof ApiError
        ? err
        : new ApiError(httpStatus.BAD_REQUEST, err.toString()),
    );
  }
};

export = handleAPICall;
