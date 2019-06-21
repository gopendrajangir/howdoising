const useragent = require('express-useragent');
const passport = require('passport');
const User = require('./../../models/User');
const mongoose = require('./../../bin/www').mongoose;
const db = mongoose.connection.db;

module.exports = (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      console.log("Error in passport authenticate at login route", err);
      res.status(500).send("Internal Server Error");
    }
    if(!user) {
      res.status(401).json({
        errors: {
          username: info.username || '',
          password: info.password || ''
        }
      })
    } else {
      req.login(user, (err) => {
        if(err) {
          console.log("Error in req login at login route", err);
          return res.status(500).send("Internal Server Error");
        }
        
        const sessionID = req.sessionID;

        const collection = db.collection('sessions')

        collection.findOne({sid: sessionID}, (err, session) => {
          
          if(err) {
            console.log("Error in collection find one at login route", err);
            return res.status(500).send("Internal Server Error");
          }

          if(!session) {
            return res.status(404).json({
              msg: "Session not found"
            })
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
              console.log("Error in user update one at login route", err);
              return res.status(500).send("Internal Server Error");
            }
            res.status(200).json({ user });
          });
        });
      });
    }
  })(req, res);
}
