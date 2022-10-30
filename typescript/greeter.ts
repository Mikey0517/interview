/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-30 13:45:46
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-30 14:15:59
 * @FilePath     : /interview/typescript/greeter.ts
 */

/* // 类型注解 value : type
function greeter (person: string) {
  return "hello, " + person;
}

let user = "Jane User";
// let user = [0, 1, 2];

document.body.innerHTML = greeter(user);
 */

/* // 接口

interface Person {
  firstName: string;
  lastName: string;
}

function greeter (person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = {
  firstName: "Jane",
  lastName: "User"
}

document.body.innerHTML = greeter(user) */

// 类
class Student {
  fullName: string;
  constructor (public firstName, public middleInitial, public lastName) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter (person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user)