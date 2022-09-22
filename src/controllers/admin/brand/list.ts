import joi from 'joi';
import mongo from '../../../connection/mongodb';

const payload = {
  body: joi.object().keys({
    page: joi.number().required(),
    limit: joi.number().required(),
  }),
};

async function handler({ body }) {
  const { page, limit } = body;

  const brand = await mongo.fmcg.model(mongo.models.brands).paginate({
    page,
    limit,
  });

  brand.msg = 'brand list.';
  return brand; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['admin'],
};

export = exportObject;
