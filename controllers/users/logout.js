const User = require('./../../models/User');
const mongoose = require('./../../bin/www').mongoose;
const db = mongoose.connection.db;

module.exports = (req, res) => {
  const sessionID = req.sessionID;
  const userId = req.user;

  console.log(req.user);

  User.findOne({ _id: mongoose.Types.ObjectId(userId)}, (err, user) => {
    if(err) {
      console.log("Error in user find one in req session destory at logout route", err);
      return res.status(500).send("Internal Server Error");
    }
    if(!user) {
      return res.status(404).json({
        msg: "User does not exist anymore"
      });
    }
      
    const collection = db.collection('sessions');
      
    collection.findOne({ sid: sessionID}, (err, session) => {
      if(err) {
        console.log("Error in collection find one at logout route", err);
        return res.status(500).send("Internal Server Error");
      }
      if(!session) {
        res.status(404).json({
          msg: "Session not found"
        });
      }
      
      const sessions = user.sessions;
      const filteredSessions = sessions.filter(userSession => {
        if(userSession.$id !== session._id) {
          return true;
        }
      });

      User.findOneAndUpdate({ id: mongoose.Types.ObjectId(userId)}, { sessions: filteredSessions }, (err, user) => {
        req.session.destroy((err) => {
          if(err) {
            console.log("Error in req session destory at logout route", err);
            return res.status(500).send("Internal Server Error");
          }
          res.status(200).json({
            msg: "You logged out successfully"
          });
        });
      });
    });
  });
}