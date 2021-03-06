const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcryptjs')
// 加盐强度
const SALT_WORK_FACTOR = 10

//创建我们的用户Schema
const userSchema = new Schema({
  UserId: ObjectId,
  // unique:true 唯一的
  userName: { unique: true, type: String },
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
}, {
    // 不使用默认的users
    collection: 'user'
  })

//每次存储数据时都要执行
userSchema.pre('save', function (next) {
  //this为userSchema
  console.log(this)
  // 加盐
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    // 加密
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

userSchema.methods = {
  //密码比对的方法
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

//发布模型
mongoose.model('User', userSchema)