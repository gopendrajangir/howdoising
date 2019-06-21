const multer = require('multer');
const GridFSStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const mongoURI = require('../config/keys').mongoURI;
const path = require('path');

const gfs = require('./../config/gfs');

gfs.collection('images');

const imageStorage = new GridFSStorage({
  url:  mongoURI,
  file: (req, file) => {
    console.log(file);
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if(err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename, bucketName: 'images'
        };
        resolve(fileInfo);
      })
    })
  }
})

exports.uploadImage = multer({ storage: imageStorage });
