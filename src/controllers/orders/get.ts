import joi from 'joi';
import mongo from '../../connection/mongodb';
import getOrderData from '../utiles';

const payload = {
  query: joi.object().keys({
    id: joi.string().required(),
  }),
};

async function handler({ query, user }) {
  const { id } = query;
  const { userId } = user;

  let order = await mongo.fmcg.model(mongo.models.orders).find({
    query: {
      _id: id,
      userId,
    },
  });
  order = await getOrderData(order);
  order.msg = 'get order info!';

  return order; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['user'],
};

export = exportObject;
