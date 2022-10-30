/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-30 23:09:55
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-31 00:25:49
 * @FilePath     : /interview/test/2022-10-30.js
 */
// Promise.all, debounce, throttle, new, extend, flat, reduce, instanceof, call, apply, bind
Promise.prototype.all = function (arr) {
  const args = Array.prototype.slice.call(arr)

  return new Promise(function (resolve, reject) {
    if (args.length === 0) resolve([])
    const remaining = args.length

    for (let i = 0; i < args.length; i++) {
      res(i, args[i])
    }

    function res (i, val) {
      try {
        if (val && (typeof val === 'function' || typeof val === 'object')) {
          const { then } = val
          if (typeof then === 'function') {
            then.call(val, function (val) {
              res(i, val)
            })
            return
          }
        }
        args[i] = val
        if (--remaining === 0) {
          resolve(args)
        }
      } catch (e) {
        reject(e)
      }
    }
  })
}

const debounce = function (fn, wait, immediate) {
  let timeout = null

  const debounced = function () {
    const context = this
    const args = arguments

    if (timeout) clearTimeout(timeout)

    if (immediate) {
      const call = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (call) fn.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        fn.apply(context, args)
        timeout = null
      }, wait)
    }
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

const throttle = function (fn, wait) {
  let timeout
  let prevtime = 0

  const throttled = function () {
    const context = this
    const args = arguments
    const now = +new Date()
    const remaining = wait - (now - prevtime)

    if (remaining <= 0) {
      fn.apply(context, args)
      prevtime = now
      clearTimeout(timeout)
      timeout = null
    } else if (!timeout) {
      timeout = setTimeout(function () {
        fn.apply(context, args)
        prevtime = +new Date()
        clearTimeout(timeout)
        timeout = null
      }, remaining)
    }
  }

  return throttled
}

function myNew () {
  const obj = new Object()

  const constructor = Array.prototype.shift.call(arguments)

  obj.__proto__ = constructor.prototype

  const result = constructor.apply(obj, arguments)

  return typeof result === 'object' ? result : obj
}

function extend (child, parent) {
  function create(o) {
    function F () {}
    F.prototype = o
    return new F()
  }

  const prototype = create(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}

function flat (arr, level = 0) {
  if (level > 0) {
    return arr.reduce(function (prev, next) {
      return prev.concat(Array.isArray(next) ? flat(next, level - 1) : next)
    }, [])
  } else {
    return arr.slice()
  }
}

Array.prototype.reduce = function (fn) {
  if (this === null || this === undefined) {
    throw Error('...')
  }

  if (typeof fn !== 'function') {
    throw Error('...')
  }

  const o = Object(this)
  const length = o.length
  let k = 0
  let value

  if (arguments[1] !== undefined) {
    value = arguments[1]
  } else {
    while(k < length && !(k in o)) {
      k++
    }

    if (k >= length) {
      throw Error('...')
    }

    value = o[k++]
  }

  for (; k < length; k++) {
    if (k in o) {
      value = fn(value, o[k], k, o)
    }
  }

  return value
}

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

function call (context) {
  context = (context === null || context === undefined) ? window : Object(context)

  context.fn = this

  const args = []

  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${ i }]`)
  }

  const result = eval(`context.fn(${ args })`)

  Reflect.deleteProperty(context, 'fn')

  return result
}

function apply (context, args) {
  context = (context === null || context === undefined) ? window : Object(context)

  context.fn = this

  const params = []

  for (let i = 0; i < args.length; i++) {
    params.push(`args[${ i }]`)
  }

  const result = eval(`context.fn(${ params })`)

  Reflect.deleteProperty(context, 'fn')

  return result
}

function bind (context) {
  function create (o) {
    function F () {}
    F.prototype = o
    return new F ()
  }

  context = (context === null || context === undefined) ? window : Object(context)

  const fn = this

  const args = Array.prototype.slice(arguments, 1)

  function FBound () {
    const _args = Array.prototype.slice(arguments)
    return fn.apply(this instanceof FBound ? this : context, args.concat(_args))
  }

  FBound.prototype = create(this.prototype)

  return FBound
}