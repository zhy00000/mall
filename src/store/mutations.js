import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'


export default {
    // mutations 唯一的目的就是修改state中的状态
    // 其中每个方法完成的事件尽可能单一
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        state.cartList.push(payload)
    }
}