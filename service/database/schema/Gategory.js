const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId

const categorySchema = new Schema({
  ID: { unique: true, type: String },
  MALL_CATEGORY_NAME: { type: String },
  IMAGE: { type: String },
  TYPE: { type: Number },
  SORT: { type: Number },
  COMMENTS: { type: String }
}, {
    // 不使用默认的
    collection: 'category'
  })

mongoose.model('Category', categorySchema)