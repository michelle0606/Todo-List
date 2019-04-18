const express = require("express");
const router = express.Router();
const User = require("../models/user-model");

// 登入頁面
router.get("/login", (req, res) => {
  res.render("login");
});

// 登入檢查
router.post("/login", (req, res) => {
  const user = User(req.body);

  User.save(err => {
    if (err) return console.log(err);
    return res.redirect("/");
  });
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
  res.send("logout");
});

module.exports = router;
