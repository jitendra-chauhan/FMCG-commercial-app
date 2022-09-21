import express from 'express';
import mongo from '../connection/mongodb';
import login from '../controllers/login';
import get from '../controllers/get';
import requestHandler from '../middlewares/requestHandler';

const router = express.Router();

/**
 * API for test Route
 */

router.get('/', async (req, res) => {
  console.log('test call ------->');
  const adminInfo = await mongo.bettingApp.model(mongo.models.admins).findOne({
    query: {},
  });
  console.log('adminInfo');
  console.log(adminInfo);

  res.send(req.originalUrl);
});

router.post('/login', requestHandler(login));
router.post('/get', requestHandler(get));
export = router;
