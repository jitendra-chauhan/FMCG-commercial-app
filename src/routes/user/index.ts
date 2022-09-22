import express from 'express';

import requestHandler from '../../middlewares/requestHandler';
import register from '../../controllers/user/register';
import login from '../../controllers/user/login';
import getInfo from '../../controllers/user/info';

const router = express.Router();

/**
 * API for user
 * @route POST /user/register
 * @group user Api [Auth Api]
 * @param {registerUser.model} Data.body.required - user Singup
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef registerUser
 * @property {string} email - email - eg: test@xyz.com
 * @property {string} password - password - eg: 12345678
 * @property {string} firstName - first Name - eg: ms
 * @property {string} lastName - last Name - eg: jes
 */
router.post('/register', requestHandler(register));

/**
 * API for user
 * @route POST /user/login
 * @group user Api [Auth Api]
 * @param {loginUser.model} Data.body.required - user Singin
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef loginUser
 * @property {string} email - email - eg: test@xyz.com
 * @property {string} password - password - eg: 12345678
 */
router.post('/login', requestHandler(login));

/**
 * API for user
 * @route GET /user/getInfo
 * @group user Api [Auth Api]
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

router.get('/getInfo', requestHandler(getInfo));

export = router;
