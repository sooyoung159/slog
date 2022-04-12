const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증처리를 하는곳

  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;

  // 토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    // index에서 토큰과 유저정보를 사용하기위해 넣어준다.
    req.token = token;
    req.user = user;
    next();
  });

  // 유저가 있으면 인증

  // 없으면 에러 처리
};

module.exports = { auth };
