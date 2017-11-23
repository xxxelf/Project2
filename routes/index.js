var express = require('express');
var router = express.Router();
// Clubs model
const Club = require("../models/club");

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index');
});

// Ensure pages
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}
// Get profile page

router.get('/profile', ensureAuthenticated, (req, res, next) => {
  res.render('profile', {
    user: req.user
  });
});

// Get clubs page
router.get('/clubs', ensureAuthenticated, (req, res, next) => {
  res.render('clubs', {
    user: req.user
  });
});

//Get each club page info

router.get('/clubs/:id', ensureAuthenticated, (req, res, next) => {
  res.render('clubsinfo', {
    user: req.user
  });
});
//Get add club page
router.get('/addclub', ensureAuthenticated, (req, res, next) => {
  res.render('addclub', {
    user: req.user
  });
});

//New club
router.post("/addclub", ensureAuthenticated, (req, res, next) => {
  const clubname = req.body.clubname;
  const address = req.body.address;
  const phonenumber = req.body.phonenumber;
  const website = req.body.website;
  // Validation
  if (clubname === "" || phonenumber === "" || req.body.latitude === "" || req.body.longitude === "") {
    res.render("addclub", {
      errorMessage: "Indicate a clubname, location and a phonenumber to add a Club"
    });
    return;
  };

  //Check if the club already exis
  const criteria = {
    "clubname": clubname
  };
  Club.findOne(criteria, (err, club) => {
    if (club !== null) {
      res.render("addclub", {
        errorMessage: "The clubname already exists"
      });
      return;
    }

    // var salt = bcrypt.genSaltSync(bcryptSalt);
    // var hashPass = bcrypt.hashSync(password, salt);
    // Get Params from POST
    let location = {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude]
    };

    const newClub = new Club({
      clubname,
      address,
      phonenumber,
      website,
      location
    });

    //Save the club
    newClub.save((err) => {
      res.redirect('/');
    });
  });
});


module.exports = router;