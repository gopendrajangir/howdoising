const mongoose = require('./../../bin/www').mongoose;
const ObjectId = mongoose.Types.ObjectId;
const db = mongoose.connection.db;

module.exports = (req, res) => {
  
  const id = req.params.id;

  const collection = db.collection('sessions');
  
  collection.updateOne({ _id: ObjectId(id) }, { $set: {session: null} },(err, session) => {
  
    if(err) {
      console.log("Error in collection find one at session logout route", err);
      return res.status(500).send("Internal Server Error");
    }
  
    if(!session) {
      return res.status(404).json({
        msg: "Session does not exist"
      });  
    }
    
    res.status(200).json({
      msg: "Session logged out successfully"
    });
  });
}