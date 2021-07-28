<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:'Scroll',
  props:{
      probeType:{
          type:Number,
          default:0
      },
      pullUpLoad:{
          type:Boolean,
          default:false
      }
  },
  data(){
      return{
          scroll:null
      }
  },
  mounted(){
    //   this.scroll= new BScroll(document.querySelector('.wrapper'),{})
    // 1.创建BScroll对象
    this.scroll=new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
    })
    // 2.监听滚动的位置
    if(this.probeType===2||this.probeType===3){
          this.scroll.on('scroll',(position)=>{
        // console.log(position);
        // 子传父
            this.$emit('scroll',position)
    })
    }

    // 3.监听scroll 滚动到底部 上拉事件
    if(this.pullUpLoad){
          this.scroll.on('pullingUp',()=>{
        // console.log('上拉加载更多');
            this.$emit('pullingUp')
    })
    }
  },
  methods:{
    //  返回顶部的封装
      scrollTo(x,y,time=300){
        // 渲染问题 在scroll没有加载到之前就调用了 scroll 会报错 所有先判断scroll有没有数据 再调用函数
          this.scroll && this.scroll.scrollTo(x,y,time)
      },
    // 上拉加载事件不过不加finishPullUp 就只会执行一次 
      finishPullUp(){
          this.scroll && this.scroll.finishPullUp()
      },
    // 加载完成刷新事件的封装
      refresh(){
          // console.log('refresh');
          this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        // 判定是否有值 没有返回0
        return this.scroll?this.scroll.y:0
      }
  }
}
</script>

<style scoped>

</style>
