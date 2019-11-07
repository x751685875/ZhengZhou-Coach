function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const debounce = (func, wait = 50) => {
    // 缓存一个定时器id
    let timer = 0
    // 这里返回的函数是每次用户实际调用的防抖函数
    // 如果已经设定过定时器了就清空上一次的定时器
    // 开始一个新的定时器，延迟执行用户传入的方法
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}

module.exports = {
    formatTime: formatTime,
    debounce: debounce
}