const User = require('./../../models/User');
const mongoose = require('./../../bin/www').mongoose;
const ObjectId = mongoose.Types.ObjectId;

module.exports = (req, res) => {
 
  const uid = req.user.uid;
  
  const privacy = {};

  privacy.image = req.body.image;
  privacy.email = req.body.email;

  
  User.findOneAndUpdate({ _id: ObjectId(uid)}, { $set : { privacy }}, (err, user) => {
  
    console.log(user);

    if(err) {
      console.log("Error in user find one at change privacy", err);
      return res.status(500).send("Internal Server Error");
    }

    if(!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    delete user.password;
    
    res.status(200).json({ user });
  });
}