var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', {
    title: 'Express'
  });
});

// Get profile page

router.get('/profile'), (req, res, next) => {
  res.render('profile');
};

// Get clubs page

router.get('/clubs'), (req, res, next) => {
  res.render('clubs');
};

//Get each club page info

router.get('/clubs/:id'), (req, res, next) => {
  res.render('clubsinfo');
};

module.exports = router;