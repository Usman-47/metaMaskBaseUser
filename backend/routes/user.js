const express = require("express");
const router = express.Router();
const {
    addUser,
    updateUser,
    deleteUser,
    getSpecificUser
} = require("../controllers/user")

router.post("/add-new-user", async (req, res) => {
    try {
        console.log(req.body, "walletAddresswalletAddress")

        const {
            walletAddress,
            fullName,
            discordId,
            email,
            deliveryAddress,
            phone
        } = req.body;


        const user = await addUser({
            walletAddress,
            fullName,
            discordId,
            email,
            deliveryAddress,
            phone
        })
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/update-user", async (req, res) => {
    try {
        const {
            walletAddress,
            fullName,
            email,
            deliveryAddress,
            phone
        } = req.body;

        const result = await updateUser({
            walletAddress,
            fullName,
            email,
            deliveryAddress,
            phone
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/delete-user", async (req, res) => {
    try {
        const { walletAddress } = req.query;
        let result = await deleteUser({ walletAddress })
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/get-specific-uesr", async (req, res) => {
    try {
        const {
            walletAddress,
        } = req.query;
        const user = await getSpecificUser({ walletAddress });
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/get-uesrs", async (req, res) => {
    try {
        const user = await getUsers();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
