const UserReward = require("../../models/user-reward");

const getSpecificUserReward = async ({
  _id,
}) => {
  try {
    const userReward = await UserReward.findOne({
      _id,
    });
    return userReward;
  } catch (error) {
    const err = new Error(error.message)
    throw err
  }
}

module.exports = getSpecificUserReward;


