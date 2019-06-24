const User = require('./../../models/User');
const mongoose = require('./../../bin/www').mongoose;
const ObjectId = mongoose.Types.ObjectId;

module.exports = (req, res) => {
 
  const uid = req.user.uid;
  
  User.findOne({ _id: ObjectId(uid)}, (err, user) => {
  
    if(err) {
      console.log("Error in user find one at private profile route", err);
      return res.status(500).send("Internal Server Error");
    }

    if(!user) {
      return res.status(404).json({ msg: "Problem with finding your details in database"});
    }

    delete user.password;
    
    res.status(200).json({ user });

  });
}