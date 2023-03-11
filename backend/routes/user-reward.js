const express = require("express");
const router = express.Router();
const {
  addUserReward,
  updateUserReward,
  deleteUserReward,
  getSpecificUserReward,
  getUsersRewards
} = require("../controllers/user-reward")

router.post("/add-new-user-reward", async (req, res) => {
  try {
    const {
      user,
      rewardId,
    } = req.body;

    const userReward = await addUserReward({
      user,
      rewardId,
    })
    res.status(200).send(userReward);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/update-user-reward", async (req, res) => {
  try {
    const {
      _id,
      user,
      rewardId,
      isClaimed,
      isExpired,
    } = req.body;

    const result = await updateUserReward({
      _id,
      user,
      rewardId,
      isClaimed,
      isExpired,
    })
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/delete-user-reward", async (req, res) => {
  try {
    const { _id } = req.query;
    let result = await deleteUserReward({ _id })
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/get-specific-user-reward/", async (req, res) => {
  try {

    const {
      _id,
    } = req.query;
    const user = await getSpecificUserReward({ _id });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/get-user-rewards/", async (req, res) => {
  try {
    const usersRewards = await getUsersRewards();
    res.status(200).send(usersRewards);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
