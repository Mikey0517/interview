/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-30 17:09:03
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-30 17:11:21
 * @FilePath     : /interview/typescript/object.ts
 */
declare function create (o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

/* create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error */