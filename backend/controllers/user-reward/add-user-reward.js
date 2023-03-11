const UserReward = require("../../models/user-reward");

const addUserReward = async ({
    name,
    image,
    type,
    details,
}) => {
    try {
        const userReward = await UserReward.create(
            {
                user,
                rewardId,
            },
        );
        return userReward
    } catch (error) {
        const err = new Error(error.message)
        throw err
    }
}

module.exports = addUserReward;


