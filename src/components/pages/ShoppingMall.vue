<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <!-- <img :src="locationIcon" width="70%" class="location-icon" /> -->
          <!-- 图片懒加载 -->
          <img v-lazy="locationIcon" width="70%" class="location-icon" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <div calss="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerImg" :key="index">
          <img :src="banner.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--AD banner area-->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" />
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      // 定位图标
      locationIcon: require('../../assets/images/location.png'),
      // banner
      bannerImg: [],
      // 类别
      category: [],
      // 广告条
      adBanner: ''
    }
  },
  created() {
    axios({
      url: 'https://www.easy-mock.com/mock/5d639972f33d9b4fd23044d0/smiledemo/index',
      method: 'get'
    })
      .then(res => {
        console.log(res.data)
        if (res.status == 200) {
          this.bannerImg = res.data.data.slides
          this.category = res.data.data.category
          this.adBanner = res.data.data.advertesPicture
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.location-icon {
  height: 80%;
  padding: 0.3rem;
}
.search-bar {
  height: 2.2rem;
  line-height: 2.2rem;
  background-color: #e5017d;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px soild #fff !important;
  background-color: #e5017d;
  color: #fff;
}
.swiper-area {
  clear: both;
  /* 为了解决banner懒加载过程中三个点在下面的问题 */
  max-height: 15rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  flex: 1;
  padding: 0.3rem;
  font-size: 10px;
  text-align: center;
}
</style>
