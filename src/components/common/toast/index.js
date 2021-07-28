import Toast from './Toast'
const obj = {}

obj.install = function(Vue) {
    // console.log('执行了toast的install', Vue);

    // document.body.appendChild(Toast.$el)
    // 1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)
        // 2.new.方式  根据 组件构造器 可以创建一个组件对象
    const toast = new toastContrustor()

    // 3.将组件对象, 手动挂着到某一个元素上
    toast.$mount(document.createElement('div'))

    // 4.toast.$el 对应就是div

    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast;
}

export default obj