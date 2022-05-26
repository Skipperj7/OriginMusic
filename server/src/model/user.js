const mongoose = require("mongoose");
const {Schema} = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  likes:[String],
  following:[String],
  playlists:[
    new Schema({
      title:{type:String},
      songs:[String]
    })
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);