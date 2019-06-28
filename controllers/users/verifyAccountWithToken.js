const User = require('./../../models/User');
const mongoose = require('./../../bin/www').mongoose;
const ObjectId = mongoose.Types.ObjectId;

module.exports = (req, res) => {

  const userId = req.user.uid;
  const token = req.params.token;

  User.findOne({ _id: ObjectId(userId) }, (err, user) => {
    if(err) {
      console.log("Error in findOne at register route", err);
      return res.status(500).send("Internal Server Error");        
    }
    if(!user) {
      return res.status(404).json({ msg: "User not found" });
    } else {
      if(user.accountVerificationToken.token === token && user.accountVerificationToken.maxTime > (new Date()).getTime()) {

        user.isVerified = true;
        user.accountVerificationToken = null;

        user.save((err, user) => {
          if(err) {
            console.log("Error in user save at verify Account route", err);
            return res.status(500).send("Internal Server Error");
          }

          if(!user) {
            return res.status(404).json({ msg: "User not found" });
          }

          const sessionUser = req.user;
          sessionUser.isVerified = user.isVerified;

          req.login(sessionUser, (err) => {
            if(err) {
              console.log("Error in req login at register route", err);
              return res.status(500).send("Internal Server Error");
            }

            delete user.accountVerificationToken;
            delete user.resetPasswordToken;
            delete user.resetPasswordToken;

            res.status(200).json({ user });
          });
        });
      }
    }
  });
}