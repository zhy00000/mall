import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象 
const state = {
    cartList: []
}
const store = new Vuex.Store({
    // 对Store进行抽取
    state,
    // state: {
    //     cartList: []
    // },
    mutations,
    // mutations: {
    //     // mutations 唯一的目的就是修改state中的状态
    //     // 其中每个方法完成的事件尽可能单一
    //     // addCart(state, payload) {
    //     // payload 新添加的商品
    //     // 数组常用的方法有哪些push/pop/unshift/shift/sort/reverse/filters/reduce/join
    //     // let oldProduct = null
    //     // for (let item of state.cartList) {
    //     //     if (item.iid === payload.iid) {
    //     //         oldProduct = item;
    //     //     }
    //     // }
    //     // 1.查找之前的数组中是否有该产品
    //     // let oldProduct = state.cartList.find(item => item.iid === payload.iid)

    //     // 2.判断oldProduct  
    //     // if (oldProduct) {
    //     //     oldProduct.count += 1
    //     // } else {
    //     //     payload.count = 1
    //     //     state.cartList.push(payload)
    //     // }
    //     // state.cartList.push(payload)
    //     // addCounter(state,payload){
    //     //     payload.count++
    //     // },
    //     // addToCart(state,payload){
    //     //     state.cartList.push(payload)
    //     // }
    // },
    actions,
    // actions: {
    //      addCart(context, payload) {
    //          let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    //         if (oldProduct) {
    //            // oldProduct.count += 1
    //              context.commit('addCounter', oldProduct)
    //         } else {
    //              payload.count = 1
    //                  // state.cartList.push(payload)
    //             context.commit('addToCart', payload)
    //          }
    //      }
    // }
    getters,

})

//  3.挂载到Vue实例上

export default store