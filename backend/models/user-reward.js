var mongoose = require("mongoose");
var userRewardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rewardId: { type: mongoose.Schema.Types.ObjectId, ref: "AvailableReward" },
    isClaimed: Boolean,
    isExpired: Boolean,
    isActive: Boolean,
  },
  { timestamps: true }
);
const UserReward = mongoose.model("UserReward", userRewardSchema);

module.exports = UserReward;
