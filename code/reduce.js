/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-06-23 14:28:53
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-06-24 02:14:20
 * @FilePath     : /interview/code/reduce.js
 */
/**
 * Array.reduce
 */
Array.prototype.reduce = function (fn) {
  if (this === null || this === undefined) {
    throw new Error(`Array.prototype.reduce called on null or undefined`)
  }

  if (typeof fn !== 'function') {
    throw new Error(`${ fn } not function`)
  }

  let o = this
  let value
  let k = 0
  let len = o.length

  if (arguments.length >= 2) {
    value = arguments[1]
  } else {
    while(k < len && !(k in o)) {
      k++
    }

    if (k >= len) {
      throw new Error('reduce of empty array')
    }

    value = o[k++]
  }

  for (; k < len; k++) {
    if (k in o) {
      value = fn(value, o[k], k, o)
    }
  }

  return value
}