<template>
    <div class="goods">
        <goods-list-item v-for="(item,id) in goods" :key="id" :goods-item="item"/>
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
    name:'GoodsList',
    components:{
        GoodsListItem
    },
    props:{
        goods:{
            type:Array,
            default(){
                return[]
            }
        }
    }
}
</script>

<style scoped>
    .goods{
        display: flex;
        /* 让弹性盒元素在必要的时候拆行 */
        flex-wrap: wrap;
        /* 在弹性盒子的周围都留有空白 */
        justify-content: space-around;
        padding: 2px;
    }
    
</style>
