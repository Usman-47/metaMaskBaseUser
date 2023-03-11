const AvailableReward = require("../../models/available-reward");

const updateUser = async ({
  _id,
  fullName,
  email,
  deliveryAddress,
  phone
}) => {
  try {
    const availableReward = await AvailableReward.updateOne(
      { _id },
      {
        $set: {
          fullName,
          email,
          deliveryAddress,
          phone
        },
      }
    );
    return availableReward
  } catch (error) {
    const err = new Error(error.message)
    throw err
  }
}

module.exports = updateUser;


