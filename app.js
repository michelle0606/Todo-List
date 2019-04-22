const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// 使用 express session
app.use(
  session({
    secret: "90490jq2jdncjrkljfilkcmoiqw3902i0dokl",
    resave: "false",
    saveUninitialized: "false" // secret: 定義一組自己的私鑰（字串)
  })
);
// 使用 Passport
app.use(passport.initialize());
app.use(passport.session());

// 載入 Passport config
require("./config/passport")(passport); //最後面的(passport)被當成參數傳入

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

mongoose.connect("mongodb://127.0.0.1/todo", {
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;

// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});

// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

app.use("/", require("./routes/home"));
app.use("/todos", require("./routes/todo"));
app.use("/users", require("./routes/user"));

app.listen(3000, () => {
  console.log("success!!!!!!!");
});
