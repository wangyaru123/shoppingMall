// 移动端
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import User from '@/components/pages/User'

// 报警
const mobileRouter = [
  {
    path: '/main', name: 'Main', component: Main,
    children: [
      { path: '/', name: 'ShoppingMall', component: ShoppingMall },
      { path: '/CategoryList', name: 'CategoryList', component: CategoryList },
      { path: '/Cart', name: 'Cart', component: Cart },
      { path: '/User', name: 'User', component: User }
    ]
  },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/Goods', name: 'Goods', component: Goods }
]

export default mobileRouter
