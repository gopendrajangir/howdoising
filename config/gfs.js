const mongoose = require('./../bin/www').mongoose;
const connection = mongoose.connection;
const Grid = require('gridfs-stream');

const imageBucket = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: 'images'});
const gfs = Grid(connection.db, mongoose.mongo);

exports.imageBucket = imageBucket;
exports.gfs = gfs;