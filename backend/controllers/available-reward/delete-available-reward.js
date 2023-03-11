const AvailableReward = require("../../models/available-reward");

const deleteUser = async ({
    _id
}) => {
    try {
        let availableReward = await AvailableReward.updateOne(
            { _id },
            {
                $set: {
                    isActive: false,
                },
            }
        );
        return availableReward
    } catch (error) {
        const err = new Error(error.message)
        throw err
    }
}

module.exports = deleteUser;


