const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.set("timestamps", true);

const User = mongoose.model("User", userSchema);

module.exports = User;
