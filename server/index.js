const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const app = express();
const port = process.env.NEXT_PUBLIC_PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
const { User } = require("./models/User");
mongoose
  .connect(
    `mongodb+srv://sooyoung:${process.env.NEXT_PUBLIC_MONGOOSE_PASSWORD}@cluster0.vf18v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
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

app.post("/register", (req, res) => {
  // 회원 가입할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
