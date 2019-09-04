<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
      <div>
        <van-row>
          <van-col span="6">
            <div id="leftNav">
              <ul>
                <li
                  @click="clickCategory(index,item._id)"
                  :class="{categoryActive:categoryIndex==index}"
                  v-for="(item,index) in category"
                  :key="index"
                >{{item.MALL_CATEGORY_NAME}}</li>
              </ul>
            </div>
          </van-col>
          <van-col span="18">
            <div class="tabCategorySub">
              <van-tabs v-model="active">
                <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
              </van-tabs>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'

export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],  //小类类别
      active: 0    //激活标签的值
    }
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight
    document.getElementById("leftNav").style.height = winHeight - 46 + 'px'
  },
  created() {
    this.getCategory();
  },
  methods: {
    //点击大类的方法
    clickCategory(index, categoryId) {
      this.categoryIndex = index
      this.getCategorySubByCategoryId(categoryId)
    },
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: 'get',
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message
            this.getCategorySubByCategoryId(this.category[0]._id)
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    //根据大类ID读取小类类别列表
    getCategorySubByCategoryId(categoryId) {
      console.log(categoryId)
      axios({
        url: url.getCategorySubListByID,
        method: 'post',
        data: { categoryId: categoryId }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message
            console.log(this.categorySub)
            this.active = 0
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
</style>
