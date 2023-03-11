const UserReward = require("../../models/user-reward");

const getUserRewards = async () => {
    try {
        const userReward = await UserReward.find();
        return userReward;
    } catch (error) {
        const err = new Error(error.message)
        throw err
    }
}

module.exports = getUserRewards;


