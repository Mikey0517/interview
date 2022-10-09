/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-08-23 10:30:43
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-08-23 10:35:46
 * @FilePath     : /interview/code/eventloop.js
 */
async function ayscn1() {
  console.log('ayscn1 start')
  await ayscn2()
  console.log('ayscn1 end')
}

async function ayscn2() {
  console.log('ayscn2 start')
}
setTimeout(function () {
  console.log('setTimeout start')
}, 0)
console.log('script start')
ayscn1()

new Promise(function (resolve) {
  console.log('promise start')
  resolve()
  console.log('promise2 start')
})
.then(function () {
  console.log('promise then')
})
console.log('script end')