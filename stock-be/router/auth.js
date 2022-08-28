const express = require('express');
const router = express.Router();

router.post('/api/1.0/auth/register', (req, res, next) => {
  console.log('register', req.body);
  let obj = req.body;
  res.json(obj);
});

module.exports = router;
