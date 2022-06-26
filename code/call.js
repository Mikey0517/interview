/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-06-23 16:35:16
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-06-23 16:59:11
 * @FilePath     : /interview/code/call.js
 */
/**
 * call
 */
Function.prototype.call = function (context) {
  context = Object(context) || window
  
  context.fn = this

  const args = []

  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments['+i+']')
  }

  const result = eval('context.fn('+ args +')')

  Reflect.deleteProperty(context, 'fn')

  return result
}

function log (x) {
  console.log(`${this}-${x}`)
}

log.call(null, 4)