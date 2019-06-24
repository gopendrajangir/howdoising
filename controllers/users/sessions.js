const mongoose = require('./../../bin/www').mongoose;
const db = mongoose.connection.db;

module.exports = (req, res) => {
  
  const collection = db.collection('sessions');
  
  collection.find({}, (err, sessions) => {
  
    if(err) {
      console.log("Error in collection find one at session logout route", err);
      return res.status(500).send("Internal Server Error");
    }
  
    sessions.toArray((error, documents) => {
      if(error) {
        console.log("Error in sessions to array in user sessions route", err);
        return res.status(500).send("Internal Error");
      }

      let mySessions = [];
      const mySessionId = req.sessionId;

      documents.map((document) => {
        const session = JSON.parse(document.session);
        if( session && session.passport && session.passport.user ) {
          if(session.passport.user.uid === req.user.uid) {
            if(document.sid === mySessionId) {
              session.mySession = true;
            } else {
              session.mySession = false;
            }
            delete document.sid;
            delete session.cookie;
            mySessions.push({ oid: document._id, session: session.passport.user});
          }
        }
      });
      res.status(200).json({ sessions:mySessions});
    });
  });
}