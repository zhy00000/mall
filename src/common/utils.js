/**
 * 格式化函数 ， 给日期格式化
 * date为 new Date()对象， fmt为 'yyyy-MM-dd'的格式
 */
export function formatDate(date, fmt) {
    //获取年份 根据别人输入的年份 是几位 一般 2021 或者21
    if (/(y+)/.test(fmt)) {
        let dateY = date.getFullYear() + "";
        //RegExp.$1 在判断中出现过，且是括号括起来的，所以 RegExp.$1 就是 "yyyy"
        fmt = fmt.replace(RegExp.$1, dateY.substr(4 - RegExp.$1.length));
    }

    //获取其他
    // M+是正则中一种表达规则
    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    };
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + "";
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? str : padLeftZero(str)
            );
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ("00" + str).substr(str.length);
}

// 工具函数
export function debounce(func, delay) {
    let timer = null
    return function(...args) {
        if (timer) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }
}