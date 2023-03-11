const User = require("../../models/user")

const getUsers = async ({
    walletAddress,
}) => {
    try {
        const user = await User.find();
        return user;
    } catch (error) {
        const err = new Error(error.message)
        throw err
    }
}

module.exports = getUsers;


