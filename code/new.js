/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-07-01 16:51:57
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-08-19 12:00:40
 * @FilePath     : /interview/code/new.js
 */
function new1 () {
  const obj = new Object()

  const constructor = Array.prototype.shift.call(arguments)

  obj.__proto__ = constructor.prototype

  const result = constructor.apply(obj, arguments)

  return typeof result === 'object' ? result : obj
}