const BASEURL = 'https://www.easy-mock.com/mock/5d639972f33d9b4fd23044d0/smiledemo'
const LOCALURL = 'http://localhost:3000'

const URL = {
  getShoppingMallInfo: BASEURL + '/index',
  getGoodsInfo: BASEURL + '/getGoodsInfo',
  registerUser: LOCALURL + '/user/register',  //用户注册接口
  login: LOCALURL + '/user/login'   //用户注册接口
}

module.exports = URL