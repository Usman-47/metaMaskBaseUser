var mongoose = require("mongoose");
var availableRewardSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    type: String,
    details: {},
    isAssigned: {
      type: Boolean,
      default: false,
    },
    isActive: Boolean,
  },
  { timestamps: true }
);
const AvailableReward = mongoose.model("AvailableReward", availableRewardSchema);

module.exports = AvailableReward;
