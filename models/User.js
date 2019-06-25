const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  displayname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  style: {
    type: [
      {
        type: String,
      }
    ],
    default: []
  },
  level: {
    type: String,
    required: true
  },
  image: {
    type: Schema.Types.Mixed
  },
  privacy: {
    type: Schema.Types.Mixed
  }
});

module.exports = User = mongoose.model('User', UserSchema);