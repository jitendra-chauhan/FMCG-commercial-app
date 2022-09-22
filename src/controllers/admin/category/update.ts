import joi from 'joi';
import httpStatus from 'http-status';
import mongo from '../../../connection/mongodb';
import ApiError from '../../../utils/ApiError';
import { CUSTOM_MESSAGE } from '../../../constants';
import { category } from '../../../Interface/product';

const payload = {
  body: joi.object().keys({
    id: joi.string().required(),
    catName: joi.string().required(),
  }),
};

async function handler({ body }) {
  const { id, catName } = body;

  const query = {
    _id: id,
  };
  const cat: category = await mongo.fmcg.model(mongo.models.categorys).findOne({
    query,
  });
  if (!cat) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.CATEGORY_NOT_FOUND,
    );
  }
  const newCat: category = await mongo.fmcg
    .model(mongo.models.categorys)
    .updateOne({
      query,
      update: {
        catName,
      },
    });

  newCat.msg = 'update categroy successfully.';
  return newCat; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['admin'],
};

export = exportObject;
