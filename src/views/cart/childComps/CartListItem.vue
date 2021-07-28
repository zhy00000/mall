<template>
    <div class="cart-list-item">
        <div class="product-selector">
            <check-button :is-checked="product.checked" @click.native="checkClick"></check-button>
        </div>
        <div class="product-img">
            <img :src="product.image" alt="" >
        </div>
        <div class="product-info">
            <p class="product-title">{{product.title}}</p>
            <p class="product-desc">{{product.desc}}</p>
            <span class="product-price">￥{{product.price}}</span>
            <span class="product-count">×{{product.count}}</span>
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name:'CartListItem',
  components:{
      CheckButton
  },
  props:{
      product:{
          type:Object,
          default(){
              return{}
          }
      }
  },
  methods:{
    // 选中是否显示 不要直接改界面 需要改对象模型里的数值
    // 模型改变==>界面改变
      checkClick(){
          this.product.checked = !this.product.checked
      }
  },

  data(){
   return {

   }
  }
}
</script>

<style scoped>
    .cart-list-item {
        width: 100%;
        height: 100px;
        border-bottom: 1px solid rgba(156, 156, 156,0.4);
        padding: 0.4rem;
        display: flex;
    }
    .product-selector{
        width: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0.2rem;
    }
    .product-img {
        height: 100%;
        width: 3.5rem;
    }
    .product-img img {
        height: 100%;
        width: 100%;
        border-radius: 0.5rem;
    }
    .product-info{
        position: relative;
        width: calc(100% - 3.5rem - 1.2rem - 0.4rem);
        margin-left: 0.4rem;
    }
    .product-info p {
        display: inline-block;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .product-title {
        font-size: 1rem;
        padding-bottom: 0.5rem;
    }
    .product-desc {
        font-size: 0.8rem;
        color: gray;
    }
    .product-price {
        position: absolute;
        left: 0;
        bottom: 0.4rem;
        font-size: 0.75rem;
        color: orangered;
    }
    .product-count {
        position: absolute;
        right: 0.4rem;
        bottom: 0.4rem;
        font-size: 0.75rem;
    }
</style>
