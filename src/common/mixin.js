import { debounce } from 'common/utils.js'

import BackTop from 'components/content/backTop/BackTop.vue'


export const itemListenerMixin = {
    data() {
        return {
            // 变量也可以混入
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh(), 50)

        this.itemImgListener = () => {
            this.newRefresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
            // console.log('我是混入中的内容');
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            // console.log('返回顶部');
            this.$refs.scroll.scrollTo(0, 0, 300)
        },
    }
}