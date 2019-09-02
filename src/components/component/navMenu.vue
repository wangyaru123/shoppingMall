<template>
  <div class="menudiv">
    <el-menu
      :default-active="this.$router.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409EFF"
      router
    >
      <el-menu-item index="1" route="/category">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>大类设置</span>
        </template>
      </el-menu-item>
      <el-menu-item index="2" route="/categorySub">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">小类设置</span>
        </template>
      </el-menu-item>
      <el-menu-item index="3" route="/goods">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">商品设置</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>

export default {
  data() {
    return {
    }
  }
}
</script>

<style>
.menudiv /deep/ .el-menu {
  width: 200px;
  height: 100vh;
}
</style>
