/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-01 00:27:28
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-01 00:32:16
 * @FilePath     : /interview/code/clone-deep.js
 */
function cloneDeep (target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}

    if (map.has(target)) {
      return target
    }

    map.set(target, cloneTarget)

    for (const key in target) {
      cloneTarget[key] = cloneDeep(target[key], map)
    }
  } else {
    return target
  }
}