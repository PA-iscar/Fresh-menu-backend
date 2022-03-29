const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    mobileNumber: { type: Number, unique: true, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: "" },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "cart" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
