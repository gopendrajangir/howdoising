const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const apis = require('../apis');
const secret = require('./../config/keys').secret;
const mongoose = require('./../bin/www').mongoose;
const User = require('./../models/User');
const MS = require('express-mongoose-store')(session, mongoose);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const express = require('express');

const mongooseStore = new MS({
  modelName: 'session'
});

module.exports = (app) => {
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));  
  
  app.use(logger('dev'));
  
  app.use(session({
    secret,
    resave: true,
    saveUninitialized: true,
    store: mongooseStore,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if(err) {
        return done(err);
      }
      if(!user) {
        return done(null, false, { username: "Email not registered" });
      }
      const hash = user.password;
      bcrypt.compare(password, hash, (err, result) => {
        if(err) {
          return done(err);
        }
        if(result) {
          delete user.password;
          return done(null, user);
        }
        return done(null, false, { password: "Incorrect Password"});
      });
    });
  }));  

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  
  app.use((req, res, next) => {
    req.session.reload((err) => {
      if(err) {
        console.log("Error in req session reload at middleware", err);
        return res.status(500).send("Internal Server Error");  
      }
      next();
    });
  });

  app.use('/apis', apis);
  
  app.use(express.static(path.resolve(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
  
  if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
    })
  }
}