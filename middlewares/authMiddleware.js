const User = require('./../models/User');
const mongoose = require('./../bin/www').mongoose;
const ObjectId = mongoose.Types.ObjectId;

exports.authRouteMiddleware = (req, res, next) => {
  if(!(req.user && req.user.uid)) {
    next();
  } else {
    User.findOne({ _id: ObjectId(req.user.uid)}, (err, user) => {
      if(err) {
        console.log("Error in user find one at auth route middleware", err);
        return res.status(500).send("Internal Error");
      }
      if(!user) {
        req.logout();
        return res.status(404).json({
          msg: "User not found"
        });
      }
      return res.status(200).json({ user });
    });
  }
}

exports.protectedRouteMiddleware = (req, res, next) => {
  if(req.user && req.user.uid) {
    next();
  } else {
    return res.status(403).json({
      msg: "Unathorized user"
    });
  }
}