/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-06-23 11:01:20
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-06-23 14:28:05
 * @FilePath     : /interview/code/throttle.js
 */
/**
 * 节流
*/
const throttle = function (fn, wait) {
  let time
  let prevtime = 0

  const throttled = function () {
    const context = this
    const args = arguments
    const now = +new Date()

    if (now - wait > prevtime) {
      fn.apply(context, args)
      prevtime = now
    }
  }

  return throttled
}
/**
 * 定时器版
 */
const throttle1 = function () {
  let time
  let prevtime = 0

  const throttled = function () {
    const context = this
    const args = arguments
  
    if (!time) {
      time = setTimeout(() => {
        fn.apply(context, args)
        clearTimeout(time)
        time = null
      }, wait)
    }
  }

  return throttled
}

/**
 * 结合
 */
const throttle2 = function () {
  let time
  let prevtime = 0

  const throttled = function () {
    const context = this
    const args = arguments
    const now = +new Date()
    const remaining = wait - (now - prevtime)

    if (remaining < 0) {
      fn.apply(context, args)
      prevtime = now
      clearTimeout(time)
      time = null
    } else if (!time) {
      time = setTimeout(() => {
        fn.apply(context, args)
        clearTimeout(time)
        time = null
        prevtime = +new Date()
      }, remaining)
    }
  }

  return throttled
}