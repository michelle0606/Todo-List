const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/todo", { useNewUrlParser: true });

const db = mongoose.connection;

// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});

// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

// 載入 todo model
const Todo = require("./models/todo");

app.get("/", (req, res) => {
  res.send("hello world!!!!!!");
});

app.listen(3000, () => {
  console.log("john legend !!!!!!!");
});
