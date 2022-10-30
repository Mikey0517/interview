/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-30 17:19:25
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-30 17:23:45
 * @FilePath     : /interview/typescript/let.ts
 */
// for (var i = 0; i < 10; i++) {
//   setTimeout(function() { console.log(i); }, 100 * i);
// }
// 10
// 10
// 10
// 10
// 10
// 10
// 10
// 10
// 10
// 10
// for (let i = 0; i < 10; i++) {
//   setTimeout(function() { console.log(i); }, 100 * i);
// }
// 0
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9

function foo() {
  // okay to capture 'a'
  return a;
}

// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
console.log(foo());
let a = 4;

