<template>
  <div>
    <div class="main-div">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      nowPath: '',  //当前路径
    }
  },
  created() {
    this.changeTabBarActive()
  },
  updated() {
    this.changeTabBarActive()
  },
  methods: {
    // 购物车页面出现底部导航不跟随变化的主要问题是，我们不是点击导航进入的，而是通过编程式导航进入的，这样导航栏就没有互动和触发事件，所以并没有发生变化
    changeTabBarActive() {
      this.nowPath = this.$route.path
      if (this.nowPath == '/ShoppingMall') {
        this.active = 0
      } else if (this.nowPath == '/CategoryList') {
        this.active = 1
      } else if (this.nowPath == '/Cart') {
        this.active = 2
      } else if (this.nowPath == '/User') {
        this.active = 3
      }
    },
    changeTabbar(active) {
      switch (active) {
        case 0:
          this.$router.push({ name: 'ShoppingMall' })
          break;
        case 1:
          this.$router.push({ name: 'CategoryList' })
          break;
        case 2:
          this.$router.push({ name: 'Cart' })
          break;
        case 3:
          this.$router.push({ name: 'User' })
          break;
      }
    }
  }
}
</script>

<style scoped>
</style>