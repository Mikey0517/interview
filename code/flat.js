/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-08-31 03:02:17
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-08-31 03:05:21
 * @FilePath     : /interview/code/flat.js
 */
function flat (arr, level = 1) {
  if (level > 0) {
    return arr.reduce(function (prev, next) {
      return prev.concat(Array.isArray(next) ? flat(next, level - 1) : next)
    }, [])
  } else {
    return arr.slice()
  }
}