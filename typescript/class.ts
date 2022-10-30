/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-30 20:04:56
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-30 20:21:04
 * @FilePath     : /interview/typescript/class.ts
 */
class Person {
  protected name: string;
  constructor(name: string) { this.name = name; }
}

class Employee extends Person {
  protected department: string;

  constructor(name: string, department: string) {
      super(name)
      this.department = department;
  }

  public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name); // 错误