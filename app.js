const express = require("express");
const app = express();
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));

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

// 設定路由
// Todo 首頁
app.get("/", (req, res) => {
  Todo.find((err, todos) => {
    if (err) return console.error(err);
    return res.render("index", { todos: todos });
  });
});

// 新增一筆 List 頁面
app.get("/todos/new", (req, res) => {
  res.render("new");
});

// 顯示一筆 Todo 的詳細內容
app.get("/todos/:id", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    return res.render("detail", { todo: todo });
  });
});

// 新增一筆  Todo
app.post("/todos", (req, res) => {
  const todo = Todo({
    name: req.body.name
  });

  todo.save(err => {
    if (err) return console.log(err);
    return res.redirect("/");
  });
});

// 修改 Todo 頁面
app.get("/todos/:id/edit", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    return res.render("edit", { todo: todo });
  });
});

// 修改 Todo
app.post("/todos/:id", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    todo.name = req.body.name;
    todo.save(err => {
      if (err) return console.error(err);
      return res.redirect(`/todos/${req.params.id}`);
    });
  });
});

// 刪除 Todo
app.post("/todos/:id/delete", (req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return console.error(err);
    todo.remove(err => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

app.listen(3000, () => {
  console.log("success!!!!!!!");
});
