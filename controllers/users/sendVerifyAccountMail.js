const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('./../../models/User');
const mongoose = require('./../../bin/www').mongoose;
const ObjectId = mongoose.Types.ObjectId;

module.exports = (req, res) => {

  const { isRedirected, user } = req.session.registerRedirect;

  crypto.randomBytes(20, (err, buf) => {
    var token = buf.toString('hex');
    if(err) {
      res.status(500).send("Internal Server Error");
    } else {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "howdoising.com@gmail.com",
          pass: "Administrator@123"
        }
      });
    
      const mailOptions = {
        from: "howDoISing.com@gmail.com",
        to: user.email,
        subject: "Verify howdoising account",
        text: 'You are receiving this because you (or someone else) have requested to verify your howdoising account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              req.protocol + '://' + req.headers.host + '/verify/' + token + '\n\n' +
              'If you did not request this, please ignore this email and account will not be verified.\n'
      }
    
      transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
          console.log("Error in transporter send mail at send verify account mail route", err);
          res.status(500).send("Internal Server Error");
        } else {

          const accountVerificationToken = {
            token, maxTime: (new Date()).getTime() + 3600000
          }

          User.findOneAndUpdate({ _id: ObjectId(user._id) }, { $set : { accountVerificationToken }}, {new: true}, (err, user) => {
            
            if(err) {
              console.log("Error in user find one at change display name route", err);
              return res.status(500).send("Internal Server Error");
            }

            if(!user) {
              return res.status(404).json({ msg: "User not found" });
            }
            
            if(isRedirected) {
              delete user.accountVerificationToken;
              delete user.resetPasswordToken;
              res.status(200).json({ user });
              delete req.session.registerRedirect;
            } else {
              delete req.session.registerRedirect;
              return res.status(200).json({
                msg: "Sent mail successfully"
              });
            }
          });
        }
      });
    }
  });
}