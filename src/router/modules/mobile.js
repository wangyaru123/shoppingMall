// 移动端
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'

// 报警
const mobileRouter = [
  {
    path: '/',
    name: 'ShoppingMall',
    component: ShoppingMall
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Goods',
    name: 'Goods',
    component: Goods
  },
  {
    path: '/CategoryList',
    name: 'CategoryList',
    component: CategoryList
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: Cart
  }
]

export default mobileRouter
