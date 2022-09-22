import express from 'express';

import requestHandler from '../../middlewares/requestHandler';
import create from '../../controllers/admin/products/create';
import getOne from '../../controllers/admin/products/getOne';
import list from '../../controllers/admin/products/list';
import update from '../../controllers/admin/products/update';
import deleteItem from '../../controllers/admin/products/delete';

const router = express.Router();

/**
 * API for product create
 * @route POST /product/create
 * @group product Api
 * @param {createProduct.model} Data.body.required - product create
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef createProduct
 * @property {string} catId - category id - eg: _id
 * @property {string} brandId - brand id- _id
 * @property {string} name - product Name - eg: first
 * @property {number} price - price - eg: 100
 * @property {number} item - number of stock - eg: 10
 */
router.post('/create', requestHandler(create));

/**
 * API for product info
 * @route GET /product/get
 * @group product Api
 * @param {getProduct.model} Data.query.required - get one product
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef getProduct
 * @property {string} id - product id - eg: _id
 */
router.get('/get', requestHandler(getOne));

/**
 * API for product list
 * @route POST /product/list
 * @group product Api
 * @param {listProduct.model} Data.body.required - product list
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef listProduct
 * @property {string} filter - filter - eg: 'category', 'name', 'band', 'price'
 * @property {string} search - search - hello
 * @property {number} page - page - eg: 1
 * @property {number} limit - number of stock - eg: 10
 */
router.post('/list', requestHandler(list));

/**
 * API for product update
 * @route PATCH /product/update
 * @group product Api
 * @param {updateProduct.model} Data.body.required - product update
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef updateProduct
 * @property {string} id - product id - eg: _id
 * @property {string} catId - category id - eg: _id
 * @property {string} brandId - brand id- _id
 * @property {string} name - product Name - eg: first
 * @property {number} price - price - eg: 100
 * @property {number} item - number of stock - eg: 10
 */
router.patch('/update', requestHandler(update));

/**
 * API for product delete
 * @route DELETE /product/delete
 * @group product Api
 * @param {deleteProduct.model} id.body.required - delete one product
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef deleteProduct
 * @property {string} id - product id - eg: _id
 */
router.delete('/delete', requestHandler(deleteItem));

export = router;
