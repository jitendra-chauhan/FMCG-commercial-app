import httpStatus from 'http-status';
import joi from 'joi';
import mongo from '../../connection/mongodb';
import { CUSTOM_MESSAGE } from '../../constants';
import ApiError from '../../utils/ApiError';

const payload = {
  body: joi.object().keys({
    id: joi.string().required(),
    action: joi.string().valid('cancel', 'return', 'completed').required(),
  }),
};

async function handler({ body, user }) {
  const { id, action } = body;
  const { userId } = user;

  const query = {
    _id: id,
    userId,
  };
  const order = await mongo.fmcg.model(mongo.models.orders).findOne({
    query,
    select: { _id: 0 },
  });

  if (!order) {
    throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.ORDER_NOT_FOUND);
  }
  const updateOrder = await mongo.fmcg.model(mongo.models.orders).updateOne({
    query,
    update: {
      status: action,
    },
  });

  updateOrder.msg = 'update order successfully!';

  return updateOrder; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['user'],
};

export = exportObject;
