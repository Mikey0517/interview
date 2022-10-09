/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-06-24 10:19:35
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-08-31 03:02:05
 * @FilePath     : /interview/code/bind.js
 */
/**
 * bind
 */
Function.prototype.bind = function (context) {
  context = Object(context) || window

  const self = this

  const args = Array.prototype.slice.call(arguments, 1)

  const FBound = function () {
    const _args = Array.prototype.slice.call(arguments)
    return self.apply(this instanceof FNOP ? this : context, args.concat(_args))
  }

  FBound.prototype = create( this.prototype )
  return FBound
}

function create ( o ) {
  function F () {}
  F.prototype = o
  return new F()
}