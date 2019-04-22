const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
// 載入 User model
const User = require("../models/user-model");
module.exports = passport => {
  //這邊是一個匿名function，從app.js傳入passport這個middleware為參數。
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      console.log(req.user);
      //更改預設的usernameField為email
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          //使用者未註冊email
          return done(null, false, {
            //(<error|null>, <user|false>, {message: 'incorrect reason'})
            message: "That email is not registered"
          });
        }
        if (user.password != password) {
          //使用者密碼輸入錯誤
          return done(null, false, {
            message: "Incorrect email or password"
          });
        }
        return done(null, user); //成功登入
      });
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
