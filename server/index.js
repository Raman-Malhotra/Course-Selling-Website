const express = require("express");
const app = express();
//const router = express.Router();

var cors = require("cors");

const admin = require("./routes/admin.js");
const user = require("./routes/user.js");

const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
app.use("/admin", admin);
app.use("/user", user);

mongoose.connect("mongodb://127.0.0.1:27017/coursedb");

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
