/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-31 16:05:26
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-31 16:18:53
 * @FilePath     : /interview/typescript/generator.ts
 */
function identity<T> (arg: T): T {
  return arg
}

// 接口泛型传参
interface GenericIdentityFn<T> {
  (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = identity

class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
  return x + y;
}