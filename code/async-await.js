/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-12-15 18:30:32
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-12-15 19:02:22
 * @FilePath     : /interview/code/async-await.js
 */
function promiseA () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}

function promiseB (a) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + 1)
    }, 1000)
  })
}

// async function main () {
//   let a = await promiseA()

//   return a
// }

function *main () {
  const a = yield promiseA()
  console.log(a)
  const b = yield promiseB(a)
  console.log(b)
  return b
}

function asyncToGenerator (fn) {
  return function () {
    var gen = fn.apply(this, arguments)

    return new Promise(function (resolve, reject) {
      function step (key, arg) {
        try {
          var info = gen[key](arg)
          var value = info.value
        } catch (e) {
          reject(e)
          return
        }

        if (info.done) {
          resolve(value)
        } else {
          return Promise.resolve(value).then(
            function (value) {
              step('next', value)
            },
            function (err) {
              stop('throw', err)
            }
          )
        }
      }

      return step('next')
    })
  }
}

const res = asyncToGenerator(main)()
res.then(data => {
  console.log(data)
})