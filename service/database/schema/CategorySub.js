const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId

const categorySubSchema = new Schema({
  ID: { unique: true, type: String },
  MALL_CATEGORY_ID: { type: String },
  MALL_CATEGORY_NAME: { type: String },
  MALL_SUB_NAME: { type: String },
  COMMENTS: { type: String },
  SORT: { type: Number }
}, {
    // 不使用默认的
    collection: 'categorySub'
  })

mongoose.model('CategorySub', categorySubSchema)