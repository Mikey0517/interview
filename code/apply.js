/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-06-23 21:16:57
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-06-23 21:26:27
 * @FilePath     : /interview/code/apply.js
 */
/**
 * apply
 */
Function.prototype.apply = function (context, args) {
  context = Object(context)
  
  context.fn = this

  const params = []
  for (let i = 0; i < args.length; i++) {
    params.push(`args[${i}]`)
  }

  const result = eval(`context.fn(${params})`)

  Reflect.deleteProperty(context, 'fn')

  return result
}

function log (x) {
  console.log(this + '-' + x)
}

log.apply(6, [4])