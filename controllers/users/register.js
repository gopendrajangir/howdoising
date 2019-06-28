const useragent = require('express-useragent');
const bcrypt = require('bcrypt');

const User = require('./../../models/User');
const validateRegisterInput = require('./../../validation/register');
const deleteImageById = require('./../../utils/deleteImageById');

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

  data.isVerified = false;

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
              deleteImageById(req.file.id);
            }
            return res.status(500).send("Internal Server Error");        
          }
          
          if(user) {
            if(user.isVerified) {
              if(req.file) {
                deleteImageById(req.file.id);
              }
              return res.status(409).json({
                errors: {
                  email: "Email already registered"
                }
              });
            }
          }
          
          data.privacy = {
            email: "Private",
            image: "Public"
          };

          const newUser = new User(data);

          newUser.save((err, user) => {
            if(err) {
              console.log("Error in new user save at register route", err);
              if(req.file) {
                deleteImageById(req.file.id);
              }
              return res.status(500).send("Internal Server Error");
            }
            
            delete user.password;

            const source = req.headers['user-agent'];
            const ua = useragent.parse(source);

            const sessionUser = {
              uid: user._id,
              isVerified: false,
              platform: ua.platform,
              os: ua.os,
              devices: {
                Desktop: ua.isDesktop,
                Mobile: ua.isMobile,
                Desktop: ua.isDesktop,
                Tablet: ua.isTablet,
                iPod: ua.isiPod,
                iPad: ua.isiPad
              },
              browser: ua.browser,
              version: ua.version
            }

            req.login(sessionUser, (err) => {
              if(err) {
                console.log("Error in req login at register route", err);
                return res.status(500).send("Internal Server Error");
              }

              req.session.registerRedirect = {
                isRedirected: true,
                user
              }
              
              res.redirect('/apis/users/verifyAccount');
            });
          });
        });
      });
    });
  } else {
    if(req.file) {
      deleteImageById(req.file.id);
    }
    res.status(422).json({ errors });
  }
}