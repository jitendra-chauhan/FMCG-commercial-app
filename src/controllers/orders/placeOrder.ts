import joi from 'joi';
import httpStatus from 'http-status';
import mongo from '../../connection/mongodb';
import ApiError from '../../utils/ApiError';
import { CUSTOM_MESSAGE } from '../../constants';
import { product } from '../../Interface/product';

const payload = {
  body: joi.object().keys({
    catId: joi.string().required(),
    brandId: joi.string().required(),
    productId: joi.string().required(),
    price: joi.number().required(),
    item: joi.number().required(),
  }),
};

async function handler({ body, user }) {
  const { catId, brandId, productId, price, item } = body;
  const { userId } = user;
  const document = {
    userId,
    catId,
    brandId,
    productId,
    price,
    item,
  };

  const product: product = await mongo.fmcg
    .model(mongo.models.products)
    .findOne({
      query: {
        _id: productId,
      },
      select: { _id: 1 },
    });

  if (!product) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.PRODUCT_NOT_FOUND,
    );
  }

  if (product.item < item) {
    throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.OUT_OFF_STOCK);
  }

  await mongo.fmcg.model(mongo.models.orders).insertOne({
    document,
  });

  await mongo.fmcg.model(mongo.models.brands).updateOne({
    query: {
      _id: productId,
    },
    update: {
      $inc: {
        item: -1,
      },
    },
  });
  const sendObject = {
    msg: 'order place successfully.',
  };
  return sendObject; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['user'],
};

export = exportObject;
