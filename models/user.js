const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
  },
  password: {},
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("user", userSchema);
