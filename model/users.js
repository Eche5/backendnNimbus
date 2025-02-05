const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new Schema({
  CustomerID: {
    type: Number,
    unique: true,
  },
  Name: {
    type: String,
    required: [true, "please provide a firstname"],
  },
  Email: {
    type: String,
    required: [true, "please provide an email"],
    unique: true,
  },
});

userSchema.plugin(AutoIncrement, { inc_field: "CustomerID" });

const User = mongoose.model("Customers", userSchema);

module.exports = User;
