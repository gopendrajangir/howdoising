// const mongoose = require('./../../bin/www').mongoose;
// const ObjectId = mongoose.Types.ObjectId;
// const db = mongoose.connection.db;
const mongooseStore = require('./../../middlewares/appMiddlewares').mongooseStore;

module.exports = (req, res) => {
  
  const sid = req.params.id;

  // const collection = db.collection('sessions');
  
  // collection.deleteOne({ _id: ObjectId(id) }, (err, session) => {
  
  //   if(err) {
  //     console.log("Error in collection find one at session logout route", err);
  //     return res.status(500).send("Internal Server Error");
  //   }
  
  //   if(!session) {
  //     return res.status(404).json({
  //       msg: "Session does not exist"
  //     });  
  //   }
    
    mongooseStore.destroy(sid, (err) => {
      if(err) {
        console.log(err);
      }
    })

    res.status(200).json({
      msg: "Session logged out successfully"
    });

  // });
}