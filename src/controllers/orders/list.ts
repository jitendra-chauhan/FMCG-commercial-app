import joi from 'joi';
import mongo from '../../connection/mongodb';
import categorysSchema from '../../models/categorys';
import getOrderData from '../utiles';

const payload = {
  body: joi.object().keys({
    page: joi.number().required(),
    limit: joi.number().required(),
  }),
};

async function handler({ body, user }) {
  const { page, limit } = body;
  const { userId } = user;

//   console.log(await mongo.fmcg.model(mongo.models.categorys));
//   console.log(await categorysSchema.obj);
  
  const order = await mongo.fmcg.model(mongo.models.orders).paginate({
    query: {
      userId,
    },
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
  role: ['user'],
};

export = exportObject;
