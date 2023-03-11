const User = require("../../models/user")

const updateUser = async ({
  walletAddress,
  fullName,
  email,
  deliveryAddress,
  phone
}) => {
  try {
    const user = await User.updateOne(
      { walletAddress },
      {
        $set: {
          fullName,
          email,
          deliveryAddress,
          phone
        },
      }
    );
    return user;
  } catch (error) {
    const err = new Error(error.message)
    throw err
  }
}

module.exports = updateUser;


