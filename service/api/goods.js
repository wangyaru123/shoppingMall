const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
// const fs = require('fs')

// router.get('/insertAllGoodsInfo', async (ctx) => {
//   fs.readFile('./goods.json', 'utf8', (err, data) => {
//     data = JSON.parse(data)
//     let saveCount = 0
//     const Goods = mongoose.model('Goods')
//     data.map((value, index) => {
//       console.log(value)
//       let newGoods = new Goods(value)
//       newGoods.save().then(() => {
//         saveCount++
//         console.log('成功' + saveCount)
//       }).catch(error => {
//         console.log('失败：' + error)
//       })
//     })
//   })
//   ctx.body = "开始导入数据"
// })

// router.get('/insertAllCategory', async (ctx) => {
//   fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
//     data = JSON.parse(data)
//     let saveCount = 0
//     const Category = mongoose.model('Category')
//     data.RECORDS.map((value, index) => {
//       console.log(value)
//       let newCategory = new Category(value)
//       newCategory.save().then(() => {
//         saveCount++
//         console.log('成功' + saveCount)
//       }).catch(error => {
//         console.log('失败：' + error)
//       })
//     })
//   })
//   ctx.body = "开始导入数据"
// })

// router.get('/insertAllCategorySub', async (ctx) => {
//   fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
//     data = JSON.parse(data)
//     let saveCount = 0
//     const CategorySub = mongoose.model('CategorySub')
//     data.RECORDS.map((value, index) => {
//       console.log(value)
//       let newCategorySub = new CategorySub(value)
//       newCategorySub.save().then(() => {
//         saveCount++
//         console.log('成功插入' + saveCount)
//       }).catch(error => {
//         console.log('插入失败:' + error)
//       })
//     })
//   })
//   ctx.body = "开始导入数据"
// })

//***获取商品详细信息的接口
router.post('/getDetailGoodsInfo', async (ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({ ID: goodsId }).exec()
    console.log(result)
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }
  // 以下为promise写法，没有上面优雅
  // let goodsId = ctx.request.body.goodsId
  // const Goods = mongoose.model('Goods')
  // await Goods.findOne({ ID: goodsId }).exec()
  //   .then(async (result) => {
  //     ctx.body = { code: 200, message: result }
  //   })
  //   .catch(error => {
  //     console.log(error)
  //     ctx.body = { code: 500, message: error }
  //   })
})

// 读取大类
router.get('/getCategoryList', async (ctx) => {
  try {
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }
})

// 添加大类
router.post('/addCategory', async (ctx) => {
  const Category = mongoose.model('Category')
  let newCategory = new Category(ctx.request.body)
  await newCategory.save().then(() => {
    //成功返回code=200，并返回成功信息
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    //失败返回code=500，并返回错误信息
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

// 更新大类
router.post('/updateCategory', async (ctx) => {
  try {
    let ID = ctx.request.body.ID
    let MALL_CATEGORY_NAME = ctx.request.body.MALL_CATEGORY_NAME
    const Category = mongoose.model('Category')
    let result = await Category.updateOne({ _id: ID }, { $set: { MALL_CATEGORY_NAME: MALL_CATEGORY_NAME } }).exec()
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }
})

// 删除大类
router.post('/deleteCategory', async (ctx) => {
  try {
    let ID = ctx.request.body.ID
    const Category = mongoose.model('Category')
    let result = await Category.deleteOne({ _id: ID }).exec()
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }
})

// 读取小类
router.get('/getCategorySubList', async (ctx) => {
  try {
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find().exec()
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }
})

// 读取小类根据大类ID
router.get('/getCategorySubListByID', async (ctx) => {
  try {
    //let categoryId = ctx.request.body.categoryId
    let categoryId = 1
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({ MALL_CATEGORY_ID: categoryId }).exec()
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }
})

// 添加小类
router.post('/addCategorySub', async (ctx) => {
  const CategorySub = mongoose.model('CategorySub')
  let newCategorySub = new CategorySub(ctx.request.body)
  await newCategorySub.save().then(() => {
    //成功返回code=200，并返回成功信息
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    //失败返回code=500，并返回错误信息
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

// 更新小类
router.post('/updateCategorySub', async (ctx) => {
  try {
    let ID = ctx.request.body.ID
    let MALL_SUB_NAME = ctx.request.body.MALL_SUB_NAME
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.update({ _id: ID }, { $set: { MALL_SUB_NAME: MALL_SUB_NAME } }).exec()
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }
})

// 删除小类
router.post('/deleteCategorySub', async (ctx) => {
  try {
    let ID = ctx.request.body.ID
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.deleteOne({ _id: ID }).exec()
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }
})

// 读取商品
router.get('/getGoodsListByCategorySubID', async (ctx) => {
  try {
    //let categorySubId = ctx.request.body.categoryId
    let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'
    const Goods = mongoose.model('Goods')
    let result = await Goods.find({ SUB_ID: categorySubId }).exec()
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }
})

module.exports = router