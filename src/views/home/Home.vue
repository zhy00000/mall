<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 有betterscroll tabbar 不好实现吸顶效果,多做一个tabcontrol 通过判定offsetTop的值来让这个tabcontrol显示与否 -->
    <tab-control :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl1"
                  class="tab-control" v-show="isTabFixed"></tab-control>
  <scroll class="content" 
          ref="scroll" 
          :probe-type="3" 
          @scroll="contentScroll"
          :pull-up-load="true"
          @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control  :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl2"
                    :class="{fixed:isTabFixed}"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
  </scroll>

  <!-- 修饰符native 需要监听一个组件的原生事件 -->
  <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
// import BackTop from 'components/content/backTop/BackTop.vue'


import {getHomeMultidata,getHomeGoods} from '@/network/home.js'
import { debounce }  from 'common/utils.js'
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'

export default {
    name:'Home',
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      // BackTop
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        // 返回顶部的按钮显示事件
        // isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        // itemImgListener:null
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      },
    },
    destroyed(){
        console.log('home destroyed');
    },
    // 首页和其他页面切换时 保存之前浏览到的页面 
    activated(){
        // console.log('activated');
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh()
    },
    deactivated(){
        // console.log('deactivated');
        // 1.离开首页的时候保存停留的位置的Y值
        this.saveY=this.$refs.scroll.getScrollY()
        // console.log(this.saveY);
        // 2.取消全局时间的监听
        this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    created(){
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')

      this.getHomeGoods('new')

      this.getHomeGoods('sell')

    },
    mounted(){
      // 通过混入 mixin 引入重复代码 两个组件之间复用代码 不用继承
      // 3.监听 item 中图片的加载完成

      // const newRefresh = debounce(this.$refs.scroll.refresh(),50)

      // // 对监听的事件进行保存
      // this.itemImgListener = () => {
      //   newRefresh()
      // }
      // this.$bus.$on('itemImageLoad',this.itemImgListener
      // console.log('itemImageLoad');
      // this.$refs.scroll.refresh()
      // )

      // 获取tabControl的offsetTop 然而tabControl 是个组件 没有offsetTop这个属性
      // 所有组件都有一个el属性 $el 用于获取组件中的元素
      // mounted是挂载时候获取元素 但是这时候获取offsetTop  图片还没有加载完成 只有组件文字的高度
      // console.log(this.$refs.tabControl.$el.offsetTop);
      // this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
    },
    methods:{
      // 事件监听相关的方法

      // 防抖动函数debounce的作用
      // 如果我们直接执行refresh,那么refresh函数会被执行30次.
      // 可以将refresh函数传入到debounce函数中,生成一个新的函数
      // 之后在调用非常频繁的时候,就使用新生成的函数
      // 而新生成的函数,并不会非常频繁的调用,如果下一次执行来的非常快,那么会将上一次取消
      // debounce(func,delay){
      //   let timer =null

      //   return function(...args){
      //     if (timer) {
      //       clearTimeout(timer)
      //         timer = setTimeout(()=>{
      //         func.apply(this,args)
      //       },delay)
      //     }
      //   }
      // },

      tabClick(index){
        switch(index){
          case 0:
            this.currentType="pop"
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
        }
        // 让两个tabControl 显示一致
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;
      },
      // backClick(){
      //     // console.log('返回顶部');
      //   this.$refs.scroll.scrollTo(0,0,300)
      // },
      contentScroll(position){
        // 1.判断 BackTop是否显示
        // console.log(position);
        // position.y<1000
        this.isShowBackTop=(-position.y)>1000

        // 2.决定tabControl 是否吸顶 position :fixed
        this.isTabFixed=(-position.y)>this.tabOffsetTop
      },
      loadMore(){
        // console.log('上拉加载更多');
        this.getHomeGoods(this.currentType)

        this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad(){
        // 在HomeSwiper中监听img的加载完成 
        // 加载完成后 发出事件 在Home 中正确的获取offsetTop的值
        // 为了不让Home Swiper 多次发出事件
        // 可以使用isLoad 的变量进行发出事件的状态的记录
        // 注意 这里不进行多次调用和debounce的区别
        // console.log(this.$refs.tabControl.$el.offsetTop);

        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      },

      // 网络请求相关的方法
      getHomeMultidata(){
          getHomeMultidata().then(res=>{
        // console.log(res);
        // this.result = res
            this.banners=res.data.banner.list;
            this.recommends=res.data.recommend.list;
      })
      },
      getHomeGoods(type){
          const page=this.goods[type].page+1
          getHomeGoods(type,page).then(res=>{
            // 数组传到数组... 三个点
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page+=1

            // 完成加载更多然后再次加载
            this.$refs.scroll.finishPullUp()
      })
      }
    }
}

</script>


<style scoped>
  #home {
    /* padding-top: 44px; */
    /* vh视口高度 */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动是 ,为了让导航不跟随一起滚动设置的属性 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  /* .tab-control{
    /* position: sticky; 基于用户的滚动位置来定位 */
    /* 粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。 */

    /* 使用betterscroll这个功能已经不起作用了 */
    /* position: sticky; */
    /* top: 44px;
    z-index: 9;
  } */ 
  /* .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>