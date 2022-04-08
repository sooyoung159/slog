const express = require("express");

const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://sooyoung:${process.env.MONGOOSE_PASSWORD}@cluster0.vf18v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("잘되나?");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
