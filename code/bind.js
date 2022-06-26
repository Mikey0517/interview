/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-06-24 10:19:35
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-06-24 11:31:15
 * @FilePath     : /interview/code/bind.js
 */
/**
 * bind
 */
Function.prototype.bind = function (context) {
  context = Object(context) || window

  const self = this

  const args = Array.prototype.slice.call(arguments, 1)

  function FNOP () {}

  const FBound = function () {
    const _args = Array.prototype.slice.call(arguments)
    return self.apply(this instanceof FNOP ? this : context, args.concat(_args))
  }

  FNOP.prototype = this.prototype
  FBound.prototype = new FNOP()
  return FBound
}