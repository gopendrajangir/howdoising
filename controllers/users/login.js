const useragent = require('express-useragent');
const passport = require('passport');

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
      });
    } else {
      
      const source = req.headers['user-agent'];
      const ua = useragent.parse(source);

      const sessionUser = {
        uid: user._id,
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
          console.log("Error in req login at login route", err);
          return res.status(500).send("Internal Server Error");
        }
        res.status(200).json({ user });
      });
    }
  })(req, res);
}
