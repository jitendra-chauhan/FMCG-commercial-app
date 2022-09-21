import mongoose from 'mongoose';
import httpStatus from 'http-status';
import config from '../config';
import ApiError from '../utils/ApiError';

const notFoundError = (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND));
};

const errorHandler = (error, req, res, next) => {
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, error.stack);
  }
  let { statusCode, message, stack } = error;

  statusCode = !httpStatus[statusCode] ? httpStatus.BAD_REQUEST : statusCode;
  message = message || httpStatus[statusCode];

  res.status(statusCode).json({
    statusCode,
    message,
    ...(config.env === 'test' && {
      stack: stack,
    }),
  });
};

const exportObject = {
  errorHandler,
  notFoundError,
};

export = exportObject;
