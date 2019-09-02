import Vue from 'vue'
import Router from 'vue-router'
import mobileRouter from './modules/mobile'
import pcRouter from './modules/pc'

Vue.use(Router)

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design
let isMobile = true
const rect = body.getBoundingClientRect()
if (rect.width - 1 > WIDTH) isMobile = false

export default new Router({
  routes: isMobile ? mobileRouter : pcRouter
})
