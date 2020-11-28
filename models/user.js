const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  files: {
    type: [],
  },
  avatarUrl: {
    type: String,
  },
  secretKey: {
    type: String,
  },
});

module.exports = mongoose.model("CloudUSER", UserSchema);
