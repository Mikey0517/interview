/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-09-13 01:40:56
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-09-13 02:56:20
 * @FilePath     : /interview/code/palindrome.js
 */
function palindrome (arr) {
  arr = arr.sort((a, b) => a - b)
  let res = []

  let deep = (arr, num = 0) => {
    for (let i = 0; i < arr.length; i++) {
      let n = num * 10 + arr[i]
      res.push(n)
      let cloneArr = arr.slice()
      cloneArr.splice(i, 1)
      deep(cloneArr, n)
    }
  }

  deep(arr)

  res = res.sort((a, b) => a - b)

  let last = arr[arr.length - 1] - 1

  return res[last] ? res[last] : res[res.length - 1]
}

console.log(palindrome([1, 4, 8]))