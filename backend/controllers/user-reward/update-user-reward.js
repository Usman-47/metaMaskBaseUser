const UserReward = require("../../models/user-reward");

const updateUserReward = async ({
  _id,
  user,
  rewardId,
  isClaimed,
  isExpired,
}) => {
  try {
    const userReward = await UserReward.updateOne(
      { _id },
      {
        $set: {
          user,
          rewardId,
          isClaimed,
          isExpired,
        },
      }
    );
    return userReward
  } catch (error) {
    const err = new Error(error.message)
    throw err
  }
}

module.exports = updateUserReward;


