const AvailableReward = require("../../models/available-reward");

const addAvailableReward = async ({
    name,
    image,
    type,
    details,
}) => {
    try {
        const availableReward = await AvailableReward.create(
            {
                name,
                image,
                type,
                details,
            },
        );
        return availableReward
    } catch (error) {
        const err = new Error(error.message)
        throw err
    }
}

module.exports = addAvailableReward;


