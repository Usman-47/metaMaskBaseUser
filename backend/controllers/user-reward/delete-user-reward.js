const UserReward = require("../../models/user-reward");

const deleteUserReward = async ({
    _id
}) => {
    try {
        let userReward = await UserReward.updateOne(
            { _id },
            {
                $set: {
                    isActive: true,
                },
            }
        );
        return userReward
    } catch (error) {
        const err = new Error(error.message)
        throw err
    }
}

module.exports = deleteUserReward;


