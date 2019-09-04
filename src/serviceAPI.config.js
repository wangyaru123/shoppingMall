const BASEURL = 'https://www.easy-mock.com/mock/5d639972f33d9b4fd23044d0/smiledemo'
const LOCALURL = 'http://localhost:3000'

const URL = {
  getShoppingMallInfo: BASEURL + '/index',
  getGoodsInfo: BASEURL + '/getGoodsInfo',
  registerUser: LOCALURL + '/user/register',  //用户注册接口
  login: LOCALURL + '/user/login',   //用户注册接口
  getDetailGoodsInfo: LOCALURL + '/goods/getDetailGoodsInfo',  //获取商品详情
  getCategoryList: LOCALURL + '/goods/getCategoryList', //获取大类
  addCategory: LOCALURL + '/goods/addCategory', //添加大类
  updateCategory: LOCALURL + '/goods/updateCategory',  //更新大类
  deleteCategory: LOCALURL + '/goods/deleteCategory',  //删除大类
  getCategorySubListByID: LOCALURL + '/goods/getCategorySubListByID', //获取小类根据大类ID
  getCategorySubList:LOCALURL+'goods/getCategorySubList',   //得到小类信息
  addCategorySub: LOCALURL + '/goods/addCategorySub', //添加小类
  updateCategorySub: LOCALURL + '/goods/updateCategorySub',  //更新小类
  deleteCategorySub: LOCALURL + '/goods/deleteCategorySub'  //删除小类
}

module.exports = URL