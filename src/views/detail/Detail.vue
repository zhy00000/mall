<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailnav"/>
      <scroll class="content" ref="scroll" 
              :probe-type="3"
              @scroll="contentScroll">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-params ref="params" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <goods-list ref="recommend" :goods="recommends"/>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
      <detail-bottom-bar @addCart="addToCart"/>
      <!-- <toast :message="message" :isShow="show"/> -->
    </div>
</template>

<script>
import DetailNavBar from './chidlComps/DetailNavBar.vue'
import DetailSwiper from './chidlComps/DetailSwiper.vue'
import DetailBaseInfo from './chidlComps/DetailBaseInfo.vue'
import DetailShopInfo from './chidlComps/DetailShopInfo.vue'
import DetailGoodsInfo from './chidlComps/DetailGoodsInfo.vue'
import DetailParams from './chidlComps/DetailParams.vue'
import DetailCommentInfo from './chidlComps/DetailCommentInfo.vue'
import DetailBottomBar from './chidlComps/DetailBottomBar.vue'


import Scroll from 'components/common/scroll/Scroll.vue'
// import BackTop from 'components/content/backTop/BackTop.vue'

import GoodsList from 'components/content/goods/GoodsList.vue'
// import Toast  from 'components/common/toast/Toast'


import { getDetail,Goods,Shop,GoodsParam,getRecommend } from 'network/detail.js'
import { debounce } from 'common/utils.js'
import { itemListenerMixin,backTopMixin } from 'common/mixin.js'

import { mapActions } from 'vuex'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParams,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    // BackTop,
    GoodsList,
    // Toast
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
   return {
     iid:null,
     topImages:[],
     goods:{},
     shop:{},
     detailInfo:{},
     paramInfo:{},
     commentInfo:{},
     recommends:[],
     titleTopY:[],
     getTitleTopY:"",
     currentIndex: 0,
    //  message :'',
    //  show:false
    //  isShowBackTop:false,
    //  itemImgListener:null
   }
  },
  created(){
    // 1.保存传入的id
    // console.log('this.$route.params');
    this.iid=this.$route.params.iid
    // 2.根据iid请求对应的详情数据
    getDetail(this.iid).then(res=>{
      console.log(res);
      // 获取数据
      const data =res.result
      // 1.获取顶部轮播图的数据
      this.topImages=data.itemInfo.topImages

      // 2.获取商品信息
      this.goods= new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      // 3.创建店铺信息
      this.shop=new Shop(data.shopInfo)
      
      // 4.保存商品的详细数据
      this.detailInfo=data.detailInfo;

      // 5.获取参数的详细信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      // 6.取出评论的信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }

        // 1,第一次获取 值不对 
        // 原因,元素根本没有渲染出来
        // this.titleTopY = [];
        // this.titleTopY.push(0);
        // this.titleTopY.push(this.$refs.params.$el.offsetTop - 44);
        // this.titleTopY.push(this.$refs.comment.$el.offsetTop - 44);
        // this.titleTopY.push(this.$refs.recommend.$el.offsetTop - 44);
        // console.log(this.titleTopY);


        // 2.第二次获取 值还是不对 图片还没有加载完成
        // nextTick将回调推迟到下一个 DOM 更新周期之后执行。在更改了一些数据以等待 DOM 更新后立即使用它。
        // this.$nextTick(()=>{
          // 根据最新的数据,对应的DOM已经加载完了
          // 但是图片依然没有加载完
          //获取不同组件的offsetTop
      //     this.titleTopY = [];
      //     this.titleTopY.push(0);
      //     this.titleTopY.push(this.$refs.params.$el.offsetTop - 44);
      //     this.titleTopY.push(this.$refs.comment.$el.offsetTop - 44);
      //     this.titleTopY.push(this.$refs.recommend.$el.offsetTop - 44);
      //     console.log(this.titleTopY);
      // }) 

      // 第三次获取 可以直接去加载完成的函数里获取
    })

    // 3.请求推荐数据
    getRecommend().then(res=>{
      // console.log(res);
      this.recommends = res.data.list
    })

    // 4.给getTitleTopY赋值
    // this.getTitleTopY =  debounce(() => {
      
    //   this.titleTopY = []
    //   this.titleTopY.push(0)
    //   this.titleTopY.push(this.$refs.params.$el.offsetTop - 44)
    //   this.titleTopY.push(this.$refs.comment.$el.offsetTop - 44)
    //   this.titleTopY.push(this.$refs.recommend.$el.offsetTop - 44)

    //   console.log(this.titleTopY);

    // })
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      // console.log('加载完成');
      // this.$refs.scroll.refresh()
      this.newRefresh();

      // 点击标题 滚动到对应位置
      this.titleTopY = [];
      this.titleTopY.push(0);
      this.titleTopY.push(this.$refs.params.$el.offsetTop - 44);
      this.titleTopY.push(this.$refs.comment.$el.offsetTop - 44);
      this.titleTopY.push(this.$refs.recommend.$el.offsetTop - 44);
      this.titleTopY.push(Number.MAX_VALUE)

      // console.log(this.titleTopY);
      // this.getTitleTopY();
    },
    titleClick(index){
      // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.titleTopY[index],200)
    },
    contentScroll(position){
      // 获取Y值
      // console.log(position);
      const positionY = -position.y

      // 把导航栏的 y值和 positionY进行对比+
      let length = this.titleTopY.length

      // for(let i = 0;i < length;i++){
      // 加入最大值后 数组多了一位无用的值 所以遍历的时候要少1
      for(let i = 0;i < length-1 ;i++){
        // 这样写 最后一种情况就越界了 
        // if(positionY > this.titleTopY[i] && positionY<this.titleTopY[i+1]){
        //   console.log(i);
        // }

        // 同时判断两个条件 
        // 刷新太频繁 给个currentIndex  和i 对比 相同的时候 才会执行后面的代码
        // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.titleTopY[i] && positionY <this.titleTopY[i+1]) ||(i === length -1 && positionY >= this.titleTopY[i]))){
          // console.log(i);
          // this.currentIndex = i;
          // console.log(this.currentIndex);
          // this.$refs.detailnav.currentIndex = this.currentIndex
        // }

        // hack 做法
        // 在获取四个offsetTop之后，push进一个最大值，这样就不用分开写条件了，不会溢出
        // Number.MAX_VALUE
        if(this.currentIndex !== i &&(positionY >= this.titleTopY[i]  && positionY < this.titleTopY[i+1])){
          this.currentIndex = i;
          this.$refs.detailnav.currentIndex = this.currentIndex
        }

        // 是否显示回到顶部按钮
        this.isShowBackTop=(-position.y)>1000
      }
    },
    // backClick(){
    //       // console.log('返回顶部');
    //     this.$refs.scroll.scrollTo(0,0,300)
    // },
    addToCart(){
        // console.log('加入购物车');
        // 1.获取购物车需要展示的商品信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid
        // 加入购物车时的选中状态
        product.checked = false
        
        // 2.将商品添加到购物车
        // this.$store.cartList.push(product)
        // mutations的操作
        // this.$store.commit('addCart',product)
        // actions 方法
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })

          // 3.成功添加到购物车
          // action返回promise  可以返回信息
          // this.$store.dispatch('addCart', product).then(res => {
          //   console.log(res)
          // })
        // 通过mapActions 映射 vuex actions中的函数
        this.addCart(product).then(res => {
          // console.log(res);
          // 原始toast 封装使用太麻烦了 得注册各种值
          // this.message = res;
          // this.show = true;

          // setTimeout(() =>{
          //   this.show = false;
          //   this.message =''
          // },2000)
          console.log(this.$toast);
          this.$toast.show(res)
        })
      }
  },
  mounted(){
    // 因为和首页都有同样的代码 所有使用混入 导入这个功能 避免重复代码 
    // let newRefresh = debounce(this.$refs.scroll.refresh(),50)

    // this.itemImgListener=()=>{
    //   newRefresh()
    // }
    // this.$bus.$on('itemImgLoad',this.itemImgListener)
  },
  destroyed(){
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
