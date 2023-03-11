var mongoose = require("mongoose");
var userSchema = new mongoose.Schema(
    {
        walletAddress: String,
        fullName: { type: String },
        discordName: { type: String },
        email: String,
        deliveryAddress: String,
        phone: String,
        tokenName: String,
        tokenAmount: Number,
        image: String,
        chestCollected: {
            diamond: Number,
            gold: Number,
            silver: Number,
            bronze: Number
        },
        gameWallet: [
            {
                name: String,
                amount: Number,
            }
        ],
        isActive: Boolean
    },
    { timestamps: true }
);
mongoose.model("User", userSchema);

module.exports = mongoose.model("User");
