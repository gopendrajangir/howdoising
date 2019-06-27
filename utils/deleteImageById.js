const mongoose = require('mongoose');
const imageBucket = require('./../config/gfs').imageBucket;

module.exports = (id) => {
  imageBucket.delete(mongoose.Types.ObjectId(id), (err) => {
    if(err) {
      return console.log(err);
    }
  });
}