var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require("./Wallet");

// CREATES A NEW USER
router.post("/addNewUser", function (req, res) {
  User.create(
    {
      walletAddress: req.body.walletAddress,
      fullName: req.body.fullName,
      email: req.body.email,
      deliveryAddress: req.body.deliveryAddress,
      telephone: req.body.telephone,
    },
    function (err, User) {
      if (err)
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      res.status(200).send(User);
    }
  );
});

router.patch("/updateUser", async function (req, res) {
  try {
    let user = await User.updateOne(
      { walletAddress: req.body.account },
      {
        $set: {
          tokenName: req.body.tokenName,
          tokenAmount: req.body.tokenAmount,
        },
      }
    );
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// RETURNS ALL THE PoolAddresses IN THE DATABASE
router.get("/getUesr/:walletAddress", async (req, res) => {
  let PoolAddressData = await User.findOne({
    walletAddress: req.params.walletAddress,
  });

  if (!PoolAddressData) {
    return res.status(401).send("Not found");
  }
  res.status(200).send(PoolAddressData);
});

router.get("/getLatestPoolAddress", async (req, res) => {
  let PoolAddressData = await PoolAddress.findOne({
    website: req.query.website,
  }).sort({ createdAt: -1 });

  if (!PoolAddressData) {
    return res
      .status(500)
      .send("There was a problem finding the poolAddresses.");
  }
  res.status(200).json(PoolAddressData);
});

module.exports = router;
