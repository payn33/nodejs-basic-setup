const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
    default: "none",
  },
});

module.exports = mongoose.model("items", itemsSchema);
