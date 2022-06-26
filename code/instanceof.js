/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-06-24 11:30:21
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-06-24 11:43:32
 * @FilePath     : /interview/code/instanceof.js
 */
/**
 * instanceof
 */
function instanceOf (left, right) {
  left = left.__proto__
  let rightPrototype = right.prototype
  while (true) {
    if (left === null) {
      return false
    }

    if (left === rightPrototype) {
      return true
    }

    left = left.__proto__
  }
}

let a = 3
console.log(a instanceof Object)
console.log(instanceOf(a, Object))