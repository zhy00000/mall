<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button 
                :is-checked="isSelectAll" 
                class="checkall" 
                @click.native="checkClickAll"/>
            <span>全选</span>
        </div>

        <div class="total-price">
            合计:¥{{totalPrice}}
        </div>

        <div class="caclulate" @click="calcClick">
            去结算({{checkLength}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters} from 'vuex'

export default {
  name:'CartBottomBar',
  components:{
      CheckButton
  },
  computed:{
      ...mapGetters(['cartList']),

      totalPrice(){
          return this.cartList.filter(item=>{
              return item.checked
          }).reduce((preValue,item)=>{
              return preValue + item.price * item.count
          },0).toFixed(2)
      },
      checkLength(){
          return this.cartList.filter(item => item.checked).length
      },
      isSelectAll (){
        // 不管用什么方法都要先判断 购物车商品列表是否为空
        if (this.cartList.length === 0) return false
        //判断 购物车列表中没有选中的商品数组的长度 
        // 如果长度不是0 去反就会返回false
        // 长度为0时 去反 就会返回ture 
        // 1.使用 filter
        //   return !(this.cartList.filter(item => !item.checked).length)

        // 2.find 函数也可以 不用遍历 可以提高性能
        // return !this.cartList.find(item => !item.checked)

        // 3.普通的遍历方法
        for ( let item of this.cartList){
            if (!item.checked){
                return false
            }
        }
        return true
      }
  },
  methods:{
      checkClickAll(){
        // 点击全选按钮 实现全选
        //   console.log('全选');
        if (this.isSelectAll){
            // 全部选中 然后变成不选中
            this.cartList.forEach(item => item.checked = false)
        }else {
            // 有部分或者全部不选中
            this.cartList.forEach(item => item.checked = true);
        }
        // this.cartList.forEach(item =>item.checked = !this.isSelectAll);
      },
      calcClick(){
          if(!this.isSelectAll){
              this.$toast.show('请选择购买的商品',2000)
          }
      }
  },
  data(){
   return {

   }
  }
}
</script>

<style scoped>
    .bottom-bar {
        position: relative;
        display: flex;

        height: 40px;
        line-height: 40px;

        background-color:#eee;
    }
    .check-content {
        display: flex;
        align-items: center;
        margin-left: 10px; ;
        width: 60px;
    }
    .checkall {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }
    .total-price {
        margin-left: 30px;
        flex: 1;
    }
    .caclulate {
        width: 90px;
        background-color: red;
        color: #fff;
        text-align: center;
    }
</style>
