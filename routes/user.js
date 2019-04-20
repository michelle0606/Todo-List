const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const passport = require("passport");

// 登入頁面
router.get("/login", (req, res) => {
  res.render("login");
});

// 登入檢查
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/", // 登入成功會回到根目錄
    failureRedirect: "/users/login" // 失敗會留在原本頁面
  })(req, res, next);
});

// 註冊頁面
router.get("/register", (req, res) => {
  res.render("register");
});

// 註冊檢查
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body; //這個叫解構賦值:Destructuring，可以將陣列或物件中的資料取出成為獨立變數。
  User.findOne({ email: email }).then(user => {
    //Model.findOne()中第一個參數是type,第二個是要比對的值
    if (user) {
      console.log("User already exists");
      res.render("register", {
        name,
        email,
        password,
        password2
      });
    } else {
      const newUser = new User({
        name,
        email,
        password
      });
      newUser
        .save()
        .then(user => {
          res.redirect("/");
        })
        .catch(err => console.log(err));
    }
  });
});

// 登出
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/users/login");
});

module.exports = router;
