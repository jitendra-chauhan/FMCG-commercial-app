import express from 'express';

import requestHandler from '../../middlewares/requestHandler';
import register from '../../controllers/admin/register';
import login from '../../controllers/admin/login';
import getUserList from '../../controllers/admin/getUserList';

const router = express.Router();

/**
 * API for Admin
 * @route POST /admin/register
 * @group Admin Api [Auth Api]
 * @param {register.model} Data.body.required - Admin Singup
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef register
 * @property {string} email - email - eg: test@xyz.com
 * @property {string} password - password - eg: 12345678
 * @property {string} firstName - first Name - eg: ms
 * @property {string} lastName - last Name - eg: jes
 */
router.post('/register', requestHandler(register));

/**
 * API for Admin
 * @route POST /admin/login
 * @group Admin Api [Auth Api]
 * @param {login.model} Data.body.required - Admin Singin
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef login
 * @property {string} email - email - eg: test@xyz.com
 * @property {string} password - password - eg: 12345678
 */
router.post('/login', requestHandler(login));

/**
 * API for Admin
 * @route POST /admin/getUserList
 * @group Admin Api [Auth Api]
 * @param {userList.model} Data.body.required - Admin Singin
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef userList
 * @property {number} page - number of currant page - eg: 1
 * @property {number} limit - number of limit record in one page  - eg: 10
 */
router.post('/getUserList', requestHandler(getUserList));

export = router;
