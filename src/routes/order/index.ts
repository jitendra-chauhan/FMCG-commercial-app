import express from 'express';
import requestHandler from '../../middlewares/requestHandler';
import placeOrder from '../../controllers/orders/placeOrder';
import getOne from '../../controllers/orders/get';
import list from '../../controllers/orders/list';
import getAllOrders from '../../controllers/admin/getAllOrders';
import action from '../../controllers/orders/action';

const router = express.Router();

/**
 * API for order place
 * @route POST /order/place
 * @group order Api
 * @param {placeOrder.model} Data.body.required - order place
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef placeOrder
 * @property {string} catId - category id - eg: id
 * @property {string} brandId - brand Id - eg: id
 * @property {string} productId - product Id - eg: id
 * @property {number} price - product price - eg: 100
 * @property {number} item - number of product  - eg: 2
 */
router.post('/place', requestHandler(placeOrder));

/**
 * API for get order Info
 * @route GET /order/get
 * @group order Api
 * @param {getOrder.model} id.query.required - get one order
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef getOrder
 * @property {string} id - order id - eg: _id
 */
 router.get('/get', requestHandler(getOne));

 /**
 * API for order list
 * @route POST /order/list
 * @group order Api
 * @param {orderList.model} Data.body.required - order list
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef orderList
 * @property {number} page - number of currant page - eg: 1
 * @property {number} limit - number of limit record in one page  - eg: 10
 */
router.post('/list', requestHandler(list));

/**
 * API for order get All Orders
 * @route POST /order/getAllOrders
 * @group order Api only for admin
 * @param {orderList.model} Data.body.required - order list
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef orderList
 * @property {number} page - number of currant page - eg: 1
 * @property {number} limit - number of limit record in one page  - eg: 10
 */
router.post('/getAllOrders', requestHandler(getAllOrders));

/**
 * API for order action
 * @route POST /order/action
 * @group order Api 
 * @param {orderAction.model} Data.body.required - order action
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef orderAction
 * @property {string} id - order id - eg: _id
 * @property {string} action - any one pass  - eg: 'cancel', 'return', 'completed'
 */
router.post('/action', requestHandler(action));
export = router;
