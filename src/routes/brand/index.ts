import express from 'express';
import requestHandler from '../../middlewares/requestHandler';
import create from '../../controllers/admin/brand/create';
import getOne from '../../controllers/admin/brand/getOne';
import list from '../../controllers/admin/brand/list';
import update from '../../controllers/admin/brand/update';
import deleteItem from '../../controllers/admin/brand/delete';

const router = express.Router();

/**
 * API for brand create
 * @route POST /brand/create
 * @group brand Api
 * @param {createBrand.model} Data.body.required - brand create
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef createBrand
 * @property {string} brandName - brand Name - eg: cool
 */
router.post('/create', requestHandler(create));

/**
 * API for get brand Info
 * @route GET /brand/get
 * @group brand Api
 * @param {getBrand.model} id.query.required - get one brand
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef getBrand
 * @property {string} id - brand id - eg: _id
 */
router.get('/get', requestHandler(getOne));

/**
 * API for brand list
 * @route POST /brand/list
 * @group brand Api
 * @param {listBrand.model} Data.body.required - brand list
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef listBrand
 * @property {number} page - page - eg: 1
 * @property {number} limit - number of stock - eg: 10
 */
router.post('/list', requestHandler(list));

/**
 * API for brand update
 * @route PATCH /brand/update
 * @group brand Api
 * @param {updateBrand.model} Data.body.required - brand update
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef updateBrand
 * @property {string} id - brand id - eg: _id
 * @property {string} brandName - brand Name - eg: cool
 */
router.patch('/update', requestHandler(update));

/**
 * API for brand delete
 * @route DELETE /brand/delete
 * @group brand Api
 * @param {deleteBrand.model} id.body.required - delete one brand
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef deleteBrand
 * @property {string} id - brand id - eg: _id
 */
router.delete('/delete', requestHandler(deleteItem));

export = router;
