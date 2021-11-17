const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  items: [
    {   
      id: '',
      name: { type: String, required: true },
      brand: { type: String },
      quantity: { type: Number, required: true}
    },
  ],
  customer_phone: { type: Number },
}, {timestamps: true});
module.exports = mongoose.model("orders", orderSchema);
