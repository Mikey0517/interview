/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-09-16 11:12:29
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-09-16 15:46:54
 * @FilePath     : /interview/test/index.js
 */
// Promise.all, debounce, throttle, new, extend, flat, reduce, instanceof, call, apply, bind
Promise.prototype.all = function (arr) {
  const args = Array.prototype.slice.call(arr)
  return new Promise(function (resolve, reject) {
    if (args.length === 0) resolve([])
    let remaining = args.length
    function res (val, i) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          const { then } = val
          if (typeof then === 'function') {
            then.call(val, function (val) {
              res(val, i)
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
    for (let i = 0; i < args.length; i++) {
      res(args[i], i)
    }
  })
}

function debounce (fn, wait, immediate) {
  let timeout = null
  const debounced = function () {
    const context = this
    const args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      let call = !timeout
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

function throttle (fn, wait) {
  let prevtime = 0
  let timeout

  const throttled = function () {
    const context = this
    const args = arguments
    const now = +new Date()
    const remaining = wait - (now - prevtime)

    if (remaining < 0) {
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
}

function myNew () {
  const obj = new Object()

  const constructor = Array.prototype.shift(arguments)

  obj.__proto__ = constructor.prototype

  const result = constructor.apply(obj, arguments)

  return typeof result === 'object' ? result : obj
}

function extend (child, parent) {
  function create (o) {
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
    throw new Error('...')
  }

  if (typeof fn !== 'function') {
    throw new Error('...')
  }

  const o = Object(this)
  const length = o.length
  let value
  let k = 0

  if (arguments.length > 1) {
    value = arguments[1]
  } else {
    while (k < length && !(k in o)) {
      k++
    }

    if (k >= length) {
      throw new Error('...')
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
  let rightPrototype = right

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

Function.prototype.call = function (context) {
  context = Object(context) || window

  context.fn = this

  const args = []

  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`)
  }

  const result = eval(`context.fn(${args})`)

  Reflect.deleteProperty(context, 'fn')

  return result
}

Function.prototype.apply = function (context, args) {
  context = Object(context) || window

  context.fn = this

  const params = []
  for (let i = 0; i < args.length; i++) {
    params.push(`args[${i}]`)
  }

  const result = eval(`context.fn(${params})`)

  Reflect.deleteProperty(context, 'fn')

  return result
}

Function.prototype.bind = function (context) {
  function create (o) {
    function F () {}
    F.prototype = o
    return new F()
  }

  context = Object(context) || window
  const args = Array.prototype.slice.call(arguments, 1)
  const self = this

  function FBound () {
    const _args = Array.prototype.slice.call(arguments)
    return self.apply(this instanceof FBound ? this : context, args.concat(_args))
  }

  FBound.prototype = create(this.prototype)

  return FBound
}