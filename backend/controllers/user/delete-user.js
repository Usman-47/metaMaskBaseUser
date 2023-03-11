const User = require("../../models/user")

const deleteUser = async ({
    walletAddress,
}) => {
    try {
        let user = await User.updateOne(
            { walletAddress },
            {
                $set: {
                    isActive: false,
                },
            }
        );
        return user
    } catch (error) {
        const err = new Error(error.message)
        throw err
    }
}

module.exports = deleteUser;


