/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-06-23 10:42:41
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-06-23 11:11:07
 * @FilePath     : /interview/code/debounce.js
 */
/**
 * 防抖
 */
const debounce = function (fn, wait, immediate) {
  let time
  const debounced = function () {
    const context = this
    const args = arguments

    if (time) clearTimeout(time)
    if (immediate) {
      const call = !time
      time = setTimeout(() => {
        time = null
      }, wait)
      if (call) fn.apply(context, args)
    } else {
      time = setTimeout(() => {
        fn.apply(context, args)
      }, wait)
    }
  }

  debounced.cancel = function () {
    clearTimeout(time)
    time = null
  }

  return debounced
}