const User = require("../../models/user")

const addUser = async ({
    walletAddress,
    fullName,
    discordId,
    email,
    deliveryAddress,
    phone
}) => {
    try {
        const user = await User.create(
            {
                walletAddress,
                fullName,
                discordId,
                email,
                deliveryAddress,
                phone
            },
        );
        return user;
    } catch (error) {
        const err = new Error(error.message)
        throw err
    }
}

module.exports = addUser;


