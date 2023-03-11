const express = require("express");

const user = require("./user");
const userReward = require("./user-reward");
const availableReward = require("./available-reward");

const router = express.Router();

router.use("/user", user);
router.use("/user-reward", userReward);
router.use("/available-reward", availableReward);

module.exports = router;
