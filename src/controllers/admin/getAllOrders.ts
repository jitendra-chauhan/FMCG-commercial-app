import joi from 'joi';
import mongo from '../../connection/mongodb';
import getOrderData from '../utiles';

const payload = {
  body: joi.object().keys({
    page: joi.number().required(),
    limit: joi.number().required(),
  }),
};

async function handler({ body }) {
  const { page, limit } = body;

  const order = await mongo.fmcg.model(mongo.models.orders).paginate({
     
    page,
    limit,
  });

  order.results = await getOrderData(order.results);
  order.msg = 'get order list!';

  return order; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['admin'],
};

export = exportObject;
