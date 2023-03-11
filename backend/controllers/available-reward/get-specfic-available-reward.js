const AvailableReward = require("../../models/available-reward");

const getSpecificUser = async ({
  _id,
}) => {
  try {
    const availableReward = await AvailableReward.findOne({
      _id,
    });
    return availableReward;
  } catch (error) {
    const err = new Error(error.message)
    throw err
  }
}

module.exports = getSpecificUser;


