const mongoose = require('./../../bin/www').mongoose;
module.exports = (req, res) => {
  console.log(req.user);
  req.session.destroy((err) => {
    if(err) {
      console.log("Error in req session destory at logout route", err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).json({
      msg: "You logged out successfully"
    });
  });
}