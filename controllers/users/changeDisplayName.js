const User = require('./../../models/User');
const mongoose = require('./../../bin/www').mongoose;
const ObjectId = mongoose.Types.ObjectId;

module.exports = (req, res) => {
 
  const uid = req.user.uid;
  
  const displayname = req.body.displayname;

  User.findOneAndUpdate({ _id: ObjectId(uid) }, { $set : { displayname }}, {new: true}, (err, user) => {
  
    if(err) {
      console.log("Error in user find one at change display name route", err);
      return res.status(500).send("Internal Server Error");
    }

    if(!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    delete user.password;
    delete user.accountVerificationToken;
    delete user.resetPasswordToken;

    res.status(200).json({ user });
  });
}