<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
       <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 加入购物车的商品列表 -->
    <cart-list/>

    <!-- 底部价格和数量的汇总 -->
    <cart-bottom-bar/>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import { mapGetters } from 'vuex'

export default {
    name:'Cart',
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

      // 写成数组 是一一对应的关系
      // ...mapGetters([
      //   'cartLength',
      //   'cartList'
      // ])

      // 如果你想将一个 getter 属性另取一个名字，使用对象形式

      ...mapGetters({
        length:'cartLength'
      })
      // cartLength(){
      //   return this.$store.getters.cartLength
      // }
    }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color:#fff;
    font-weight: 600;
  }
</style>