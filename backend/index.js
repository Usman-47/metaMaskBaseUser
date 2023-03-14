const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/index")
require("dotenv").config();

const port = process.env.PORT || 8000;

app.use(cors());
mongoose.connect(
  process.env.MONGO_URL
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

app.use("/v1", router);

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});
