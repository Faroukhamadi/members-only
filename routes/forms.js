const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/login', (req, res, next) => {
  res.render('login', {
    url: req.url,
  });
});

router.get('/signup', (req, res, next) => {
  res.render('signup', {
    url: req.url,
  });
});

module.exports = router;
