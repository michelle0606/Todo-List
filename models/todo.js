const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  done: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", //定義這個屬性是從 User 這個 model 裡取得
    index: true,
    required: true
  }
});

module.exports = mongoose.model("Todo", todoSchema); //創造一個Model: mongoose.model(modelName, schema)
