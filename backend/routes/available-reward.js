const express = require("express");
const router = express.Router();
const {
  addAvailableReward,
  updateAvailableReward,
  deleteAvailableReward,
  getSpecificAvailableReward,
  getAvailableRewards
} = require("../controllers/available-reward")

router.post("/add-new-available-reward", async (req, res) => {
  try {
    const {
      name,
      image,
      type,
      details,
    } = req.body;

    const user = await addAvailableReward({
      name,
      image,
      type,
      details,
    })
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/update-available-reward", async (req, res) => {
  try {
    const {
      _id,
      name,
      image,
      type,
      details,
    } = req.body;

    const result = await updateAvailableReward({
      _id,
      name,
      image,
      type,
      details,
    })
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/delete-available-reward", async (req, res) => {
  try {
    const { _id } = req.query;
    let result = await deleteAvailableReward({ _id })
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/get-specific-available-reward/", async (req, res) => {
  try {

    const {
      _id,
    } = req.query;
    const user = await getSpecificAvailableReward({ _id });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/get-available-rewards/", async (req, res) => {
  try {
    const availableRewards = await getAvailableRewards();
    res.status(200).send(availableRewards);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
