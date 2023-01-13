var express = require("express");
var app = express();
var mongoose = require("mongoose");
const cors = require("cors");
var port = process.env.PORT || 8000;

app.use(cors());
mongoose.connect(
  "mongodb+srv://amal:ATVIfKGq19r0hsXs@cluster0.fnedh.mongodb.net/metaMaskUser"
);

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

var PoolAddressController = require("./poolAddress/PoolAddressController");
app.use("/user", PoolAddressController);

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});
