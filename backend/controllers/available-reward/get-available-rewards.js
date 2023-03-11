const AvailableReward = require("../../models/available-reward")

const getAvailableRewards = async () => {
    try {
        const AvailableReward = await AvailableReward.find();
        return AvailableReward;
    } catch (error) {
        const err = new Error(error.message)
        throw err
    }
}

module.exports = getAvailableRewards;


