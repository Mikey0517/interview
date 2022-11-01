/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-06-26 15:15:09
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-01 00:36:20
 * @FilePath     : /interview/code/promise.js
 */
/**
 * promise
 */
function Promise (fn) {
  let state = 'pending'
  let value = null
  let callbacks = []

  this.then = function (onFulfilled, onRejected) {
    return new Promise(function (resolve, reject) {
      handle({
        onFulfilled,
        onRejected,
        resolve,
        reject
      })
    })
  }

  this.all = function (arr) {
    const args = Array.prototype.slice.call(arr)
    return new Promise(function (resolve, reject) {
      if (args.length === 0) resolve([])
      let remaining = args.length

      function res (i, val) {
        try {
          if (val && (typeof val === 'function' || typeof val === 'object')) {
            const { then } = val
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val)
              }, reject)
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
        res(i, args[i])
      }
    })
  }

  function handle (callback) {
    if (state === 'pending') {
      callbacks.push(callback)
      return
    }

    const cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
    const next = state === 'fulfilled' ? callback.resolve : callback.reject

    if (!cb) {
      next(value)
      return
    }

    try {
      const ret = cb(value)
      next(ret)
    } catch (e) {
      callback.reject(e)
    }
  }

  function resolve (newValue) {
    function fn () {
      if (state !== 'pending') return

      if (newValue && (typeof newValue === 'function' || typeof newValue === 'object')) {
        const { then } = newValue
        if (typeof then === 'function') {
          then.call(newValue, resolve, reject)
          return
        }
      }

      state = 'fulfilled'
      value = newValue
      handleCb()
    }

    setTimeout(fn, 0)
  }

  function reject (error) {
    function fn () {
      if (state !== 'pending') return

      if (error && (typeof error === 'function' || typeof error === 'object')) {
        const { then } = error
        if (typeof then === 'function') {
          then.call(error, resolve, reject)
          return
        }
      }

      state = 'rejected'
      value = error
      handleCb()
    }

    setTimeout(fn, 0)
  }

  function handleCb () {
    while (callbacks.length) {
      const callback = callbacks.shift()
      handle(callback)
    }
  }

  this.catch = function (onError) {
    this.then(null, onError)
  }

  fn(resolve, reject)
}

new Promise(function (resolve) {
  setTimeout(function () {
    resolve(1)
  }, 1000)
})
.then(function (data) {
  console.log(data)
  return test()
})
.then(function (data) {
  console.log(data)
})

function test () {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(2)
    }, 1000)
  })
}