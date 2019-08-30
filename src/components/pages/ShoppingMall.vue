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
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <!--swiper-->
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floor :floorData="floor1" :floorTitle="floorName.floor1"></floor>
    <floor :floorData="floor2" :floorTitle="floorName.floor2"></floor>
    <floor :floorData="floor3" :floorTitle="floorName.floor3"></floor>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
              <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price" :goodsId="item.goodsId"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from "vue-awesome-swiper"
import Floor from "../component/floor"
import { toMoney } from "@/filter/moneyFilter"
import goodsInfo from '../component/hotgoodsInfo'
import url from '@/serviceAPI.config.js'

export default {
  components: {
    swiper,
    swiperSlide,
    Floor,
    goodsInfo
  },
  data() {
    return {
      // 定位图标
      locationIcon: require('../../assets/images/location.png'),
      // banner
      bannerImg: [],
      // 类别
      category: [],
      // 广告条
      adBanner: '',
      // 商品推荐数据
      recommendGoods: [],
      // 商品推荐显示三列
      swiperOption: {
        slidesPerView: 3
      },
      // 下面楼层数据
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [] //热卖商品
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  created() {
    axios({
      url: url.getShoppingMallInfo,
      method: 'get'
    })
      .then(res => {
        console.log(res)
        if (res.status == 200) {
          this.bannerImg = res.data.data.slides
          this.category = res.data.data.category
          this.adBanner = res.data.data.advertesPicture
          this.recommendGoods = res.data.data.recommend
          // 楼层1数据
          this.floor1 = res.data.data.floor1
          this.floor2 = res.data.data.floor2
          this.floor3 = res.data.data.floor3
          this.floorName = res.data.data.floorName
          // 热卖商品数据
          this.hotGoods = res.data.data.hotGoods
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
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>
