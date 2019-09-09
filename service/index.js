const Koa = require('koa')
const app = new Koa()
const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

const Router = require('koa-router')

// 若放在后面会出问题
app.use(bodyParser());
app.use(cors())

let user = require('./api/user.js')
let goods = require('./api/goods.js')
let goodsFile = require('./api/goodsFile.js')
let home = require('./api/home.js')

// 装载所有子路由
let router = new Router();

router.use('/user', user.routes())
router.use('/goods', goods.routes())
router.use('/goodsFile', goodsFile.routes())
router.use('/home', home.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

  //立即执行函数
  ; (async () => {
    // 数据库连接
    await connect()
    // 引入所有schema
    initSchemas()
  })()

app.use(async (ctx) => {
  ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})