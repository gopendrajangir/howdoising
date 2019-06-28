const User = require('./../../models/User');

module.exports = (req, res) => {

  const email = req.body.email;

  if(!email) {
    return res.status(422).json({ errors: { email: "Invalid Email"} });
  }

  User.findOne({ email: email }, (err, user) => {

    if(err) {
      console.log("Error in findOne at private profile verify route", err);
      return res.status(500).send("Internal Server Error");        
    }
    
    if(!user) {
      return res.status(404).json({ msg: "User not found"});
    }

    req.session.registerRedirect = {
      isRedirected: true,
      user
    }
    
    res.redirect('/apis/users/verifyAccount');
  });
}