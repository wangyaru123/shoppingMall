// 路由规则
// import Layout from '@/layout'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
// 后台管理

// 路由规则
// import Layout from '@/layout'
import Category from '@/components/pages/admin/Category'
import CategorySub from '@/components/pages/admin/CategorySub'
import PCGoods from '@/components/pages/admin/PCGoods'

const mobileRouter = [
  {
    path: '/category',
    name: 'Admin.Category',
    component: Category
  },
  {
    path: '/categorySub',
    name: 'Admin.CategorySub',
    component: CategorySub
  },
  {
    path: '/goods',
    name: 'Admin.Goods',
    component: PCGoods
  }
]

export default mobileRouter
