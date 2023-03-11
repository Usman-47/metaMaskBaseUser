const User = require("../../models/user")

const getSpecificUser = async ({
  walletAddress,
}) => {
  try {
    const user = await User.findOne({
      walletAddress,
    });
    return user;
  } catch (error) {
    const err = new Error(error.message)
    throw err
  }
}

module.exports = getSpecificUser;


