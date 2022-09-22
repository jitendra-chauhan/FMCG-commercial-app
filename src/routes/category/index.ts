import express from 'express';
import requestHandler from '../../middlewares/requestHandler';
import create from '../../controllers/admin/category/create';
import getOne from '../../controllers/admin/category/getOne';
import list from '../../controllers/admin/category/list';
import update from '../../controllers/admin/category/update';
import deleteItem from '../../controllers/admin/category/delete';

const router = express.Router();

/**
 * API for category
 * @route POST /category/create
 * @group category Api
 * @param {createCategory.model} Data.body.required - category create
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef createCategory
 * @property {string} catName - category Name - eg: cool
 */
router.post('/create', requestHandler(create));

/**
 * API for category
 * @route POST /category/get
 * @group category Api
 * @param {getCategory.model} Data.query.required - get one category
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef getCategory
 * @property {string} id - category id - eg: _id
 */
router.get('/get', requestHandler(getOne));

/**
 * API for category
 * @route POST /category/list
 * @group category Api
 * @param {listCategory.model} Data.body.required - category list
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef listCategory
 * @property {number} page - page - eg: 1
 * @property {number} limit - number of stock - eg: 10
 */
router.post('/list', requestHandler(list));

/**
 * API for category
 * @route POST /category/update
 * @group category Api
 * @param {updateCategory.model} Data.body.required - category update
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef updateCategory
 * @property {string} id - category id - eg: _id
 * @property {string} catName - category Name - eg: cool
 */
router.patch('/update', requestHandler(update));

/**
 * API for category
 * @route POST /category/delete
 * @group category Api
 * @param {deleteCategory.model} Data.query.required - delete one category
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef deleteCategory
 * @property {string} id - category id - eg: _id
 */
router.delete('/delete', requestHandler(deleteItem));

export = router;
