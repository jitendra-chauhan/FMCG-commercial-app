import express from 'express';

const router = express.Router();

/**
 * API for test Route
 */

router.get('/', async (req, res) => {
  console.log('test call ------->');
  res.send(req.originalUrl);
});

export = router;
