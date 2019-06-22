const mongoose = require('./../../bin/www').mongoose;
const db = mongoose.connection.db;

const useragent = require('express-useragent');
const bcrypt = require('bcrypt');

const User = require('./../../models/User');
const validateRegisterInput = require('./../../validation/register');
const deleteImageById = require('./../../utils/deleteImageById');

const gfs = require('./../../config/gfs');

gfs.collection('images');

module.exports = (req, res) => {

  const data = req.body;
  const style = req.body.style;
  const password = req.body.password;

  data.style = style ? style.split(',') : [];

  if(req.file) {
    data.image = {};
    data.image.$id = req.file.id;
    data.image.$ref = "images.files";
  } else {
    data.image = null;
  }

  const { isValid, errors } = validateRegisterInput(data);
  
  if(isValid) {
    
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, (err, salt) => {
      if(err) {
        console.log("Error in bcrypt genSalt at register route", err);
        return res.status(500).send("Internal Server Error");
      }
      
      bcrypt.hash(password, salt, (err, hash) => {
        if(err) {
          console.log("Error in bcrypt hash at register route", err);
          return res.status(500).send("Internal Server Error");
        }
      
        data.password = hash;
        User.findOne({ email: data.email }, (err, user) => {
  
          if(err) {
            console.log("Error in findOne at register route", err);
            if(req.file) {
              deleteImageById(gfs, req.file.id);
            }
            return res.status(500).send("Internal Server Error");        
          }
          
          if(user) {
            if(req.file) {
              deleteImageById(gfs, req.file.id);
            }
            return res.status(409).json({
              errors: {
                email: "Email already registered"
              }
            });
          }
          
          const newUser = new User(data);
    
          newUser.save((err, user) => {
            if(err) {
              console.log("Error in new user save at register route", err);
              if(req.file) {
                deleteImageById(gfs, req.file.id);
              }
              return res.status(500).send("Internal Server Error");
            }
            delete user.password;
            req.login(user, (err) => {
              if(err) {
                console.log("Error in req login at register route", err);
                return res.status(500).send("Internal Server Error");
              }
              
              const sessionID = req.sessionID;

              const collection = db.collection('sessions')
              
              collection.findOne({ sid: sessionID }, (err, session) => {

                if(err) {
                  console.log("Error in collection find one at logout route", err);
                  return res.status(500).send("Internal Server Error");
                }
                
                console.log(session);

                if(!session) {
                  return res.status(404).json({
                    errors: {
                      error: "Session not found"
                    }
                  });
                }
    
                const sessions = user.sessions;
                const source = req.headers['user-agent'];
                const ua = useragent.parse(source);
        
                sessions.push({
                  $ref: 'sessions',
                  $id: session._id,
                  platform: ua.platform,
                  os: ua.os,
                  browser: ua.browser,
                  version: ua.version
                });
    
                User.findOneAndUpdate({ email: user.email }, { sessions }, (err, result) => {
                  if(err) {
                    console.log("Error in user update one at register route", err);
                    return res.status(500).send("Internal Server Error");
                  }
                  res.status(200).json({ user });
                });
              });
            });
          });
        });
      });
    });
  } else {
    if(req.file) {
      deleteImageById(gfs, req.file.id);
    }
    res.status(422).json({ errors });
  }
}