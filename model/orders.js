const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  orderID: {
    type: Number,
  },
  CustomerID: {
    type: Schema.Types.ObjectId,
    ref: "Customers",
  },
  OrderDate: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: [true, "totalAmount is required"],
  },
});

module.exports = model("Orders", orderSchema);
