var mongoose = require("mongoose");
var userSchema = new mongoose.Schema(
  {
    walletAddress: String,
    fullName: { type: String },
    email: String,
    deliveryAddress: String,
    telephone: String,
    tokenName: String,
    tokenAmount: Number,
  },
  { timestamps: true }
);
mongoose.model("User", userSchema);

module.exports = mongoose.model("User");
