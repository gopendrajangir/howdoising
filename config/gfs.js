const mongoose = require('./../bin/www').mongoose;
const connection = mongoose.connection;
const Grid = require('gridfs-stream');
const gfs = Grid(connection.db, mongoose.mongo);

module.exports = gfs;