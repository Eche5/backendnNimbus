const { Schema, model } = require("mongoose");

const revenueSchema = new Schema({
  totalRevenue: {
    type: Number,
  },

  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("TotalRevenue", revenueSchema);
