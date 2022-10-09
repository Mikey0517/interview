/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-08-31 19:12:00
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-08-31 20:46:04
 * @FilePath     : /interview/code/more.js
 */
function more (n, rules) {
  if (rules.length === 0) return n
  if (rules.length === 1) {
    return n - (rules[1] - rules[0] + 1 + rules[2])
  }

  rules = rules.sort((p, n) => p[1] - n[1])

  let num = rules[0][1] - rules[0][0] + 1 - rules[0][2]

  for (let i = 1; i < rules.length; i++) {
    let prev = rules[i - 1]
    let next = rules[i]
    const _num = next[1] - next[0] + 1 - next[2]

    if (prev[1] >= next[0]) {
      const diff = prev[1] - next[0] + 1
      if (diff <= _num) {
        num += _num - diff
      }
    } else {
      num += _num
    }
  }

  return n - num
}

console.log(
  more(10, [
    [1, 4, 2],
    [3, 6, 2],
    [10, 10, 1]
  ])
)