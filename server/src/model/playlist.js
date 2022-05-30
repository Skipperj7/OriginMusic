const mongoose = require("mongoose");
const {Schema} = require('mongoose');

const PlaylistSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  pID: {
    type: String,
    required: true
  },
  songs:[String],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with UserSchema
module.exports = mongoose.model("playlist", PlaylistSchema);