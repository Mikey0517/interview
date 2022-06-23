/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-06-22 20:23:40
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-06-22 21:27:48
 * @FilePath     : /interview/code/curry.js
 */
/**
 * 函数柯里化
 * add( 1, 2, 3 )
 */

const curry = function ( fn, ...args ) {
  if (fn.length <= args.length) {
    return fn(...args)
  } else {
    return function ( ..._args ) {
      return curry(fn, ...args, ..._args)
    }
  }
}

function add1 ( x, y, z ) {
  return x + y + z
}

const add = curry(add1)
console.log(add(1, 2, 3))
console.log(add(1, 2)(3))
console.log(add(1)(2, 3))

/**
 * 无线循环版
*/
const argsSum = function (args) {
  return args.reduce(function (prev, next) {
    return prev + next
  })
}

const add2 = function (...args) {
  const sum = argsSum(args)
  const fn = function (...args1) {
    const sum1 = argsSum(args1)
    return add2(sum + sum1)
  }

  fn.toString = function () {
    return sum
  }

  return fn
}

console.log(add2(1, 2, 3).toString())
console.log(add2(1, 2, 3, 4, 5).toString())