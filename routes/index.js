var express = require('express');
var router = express.Router();
// Clubs model
const Club = require("../models/club");

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index');
});

// Get profile page

router.get('/profile', (req, res, next) => {
  res.render('profile');
});

// Get clubs page

router.get('/clubs', (req, res, next) => {
  res.render('clubs');
});

//Get each club page info

router.get('/clubs/:id', (req, res, next) => {
  res.render('clubsinfo');
});
//Get add club page
router.get('/addclub', (req, res, next) => {
  res.render('addclub');
});

//New club
router.post("/addclub", (req, res, next) => {
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