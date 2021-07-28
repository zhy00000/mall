<template>
    <div class="back-top">
        <img src="~assets/img/common/top.png" alt="">
    </div>
</template>

<script>
// 返回顶部按钮
export default {
  name:'BackTop',

}
</script>

<style scoped>
    .back-top{
        position: fixed;
        right: 8px;
        bottom: 50px;
    }
    .back-top img{
        width: 43px;
        height: 43px;
    }
</style>
