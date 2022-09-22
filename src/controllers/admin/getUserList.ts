import joi from 'joi';
import mongo from '../../connection/mongodb';

const payload = {
  body: joi.object().keys({
    page: joi.number().required(),
    limit: joi.number().required(),
  }),
};

async function handler({ body, user }) {
    const { page, limit } = body;

  let userInfo = await mongo.fmcg.model(mongo.models.users).paginate({
    page,
    limit,
    select: { password: 0 },
  });
  // return newUser;
  userInfo.msg = 'user List.';
  return userInfo; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['admin'],
};

export = exportObject;
