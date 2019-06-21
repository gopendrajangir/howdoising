const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
const mongoURI = require('../config/keys').mongoURI;

const port = 5000;

mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true });
const db = mongoose.connection;

db.once('open', (err) => {
  if (err) throw err;
  console.log("Database created");

  io.on('connection', (socket) => {
    console.log("connected");
  });

  server.listen(port, (err) => {
    if(err) {
      console.log("Unable to listen to server");
    } else {
      console.log("Server listening on port 3000");
      module.exports = { mongoose, app };
      require('../server');
    }
  });
})