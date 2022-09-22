import joi from 'joi';
import mongo from '../../../connection/mongodb';

const payload = {
  body: joi.object().keys({
    filter: joi.string().valid('category', 'name', 'brand', 'price').optional(),
    search: joi.string().optional(),
    page: joi.number().required(),
    limit: joi.number().required(),
  }),
};

async function handler({ body }) {
  const { filter, search, page, limit } = body;
  let query = {};
  if (filter && filter === 'category' && search) {
    const catIds = await mongo.fmcg.model(mongo.models.categorys).distinct({
      field: '_id',
      query: { catName: { $regex: search, $options:'i' } },
    });
    query = {
      catId: { $in: catIds },
    };
  } else if (filter && filter === 'brand' && search) {
    const brandIds = await mongo.fmcg.model(mongo.models.brands).distinct({
      field: '_id',
      query: { brandName: { $regex: search, $options:'i' } },
    });
    query = {
      brandId: { $in: brandIds },
    };
  } else if (filter && search) {
    query[filter] = { $regex: search, $options:'i' };
  }

  console.log("query :: ",query);
  
  let products = await mongo.fmcg.model(mongo.models.products).paginate({
    query,
    page,
    limit,
  });

  products.msg = 'products list.';
  return products; // Return response
}

const exportObject = {
  payload,
  handler,
  auth: true,
  role: ['admin', 'user'],
};

export = exportObject;
