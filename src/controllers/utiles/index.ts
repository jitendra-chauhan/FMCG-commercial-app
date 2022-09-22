import mongo from '../../connection/mongodb';
import { order } from '../../Interface/product';

async function getOrderData(orderList: [order] | []) {
  const list: any = [];
  for await (const order of orderList) {
    const catInfo = await mongo.fmcg.model(mongo.models.categorys).findOne({
      query: {
        _id: order.catId,
      },
    });
    const branInfo = await mongo.fmcg.model(mongo.models.brands).findOne({
      query: {
        _id: order.brandId,
      },
    });
    const productInfo = await mongo.fmcg.model(mongo.models.products).findOne({
      query: {
        _id: order.productId,
      },
    });

    order.catId = catInfo;
    order.brandId = branInfo;
    order.productId = productInfo;

    list.push(order);
  }

  return list;
}

export = getOrderData;
