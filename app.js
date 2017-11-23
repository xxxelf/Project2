'use strict';
//app.js
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const app = express();
const auth = require('./routes/auth');
const session = require("express-session");
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const MongoStore = require('connect-mongo')(session);

//passport
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('./models/user');
const flash = require('connect-flash');

// view engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

// Mongoose configuration DATABASE
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/iSmoke', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

//Passport
app.use(session({
  secret: 'our-passport-local-strategy-app',
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
passport.deserializeUser((id, cb) => {
  User.findOne({
    '_id': id
  }, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});
app.use(flash());
passport.use(new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, next) => {
  User.findOne({
    username
  }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, {
        message: 'Incorrect username'
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, {
        message: 'Incorrect password'
      });
    }
    return next(null, user);
  });
}));
app.use(passport.initialize());
app.use(passport.session());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Show the user that is logged.
app.use((req, res, next) => {
  res.locals = {
    user: req.user
  };
  next();
});
app.use('/', index);
app.use('/', auth);

//Configure the express-session
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// NOTE: requires a views/not-found.ejs template
app.use(function (req, res, next) {
  res.status(404);
  res.render('not-found');
});

// NOTE: requires a views/error.ejs template
app.use(function (err, req, res, next) {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;