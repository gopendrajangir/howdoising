const mongoose = require('mongoose');
const imageBucket = require('./../../config/gfs').imageBucket;
const gfs = require('./../../config/gfs').gfs;

gfs.collection('images');

module.exports = (req, res) => {
  const id = req.params.id;
  gfs.files.findOne({ _id: mongoose.Types.ObjectId(id)}, (err, image) => {
    if("Error in gfs files find one at get image route", err) {
      res.status(500).send("Internal Server Error");
    } 
    if(!image) {
      return res.status(404).send("Image not found");
    }
    const downloadStream = imageBucket.openDownloadStreamByName(image.filename);
    downloadStream.pipe(res).once('finish', (err) => {
      if(err) {
        console.log("Error in download stream pipe finish at get image route", err);
      }
    });
  });
}