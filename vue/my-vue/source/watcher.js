import Dep from "./dep.js";

/**
 * Watcher 观察者，
 */
export default class Watcher {
  constructor ( vm, key, cb ) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    // Dep 和 Watcher 是一一对应的
    Dep.target = this;

    // 初始化时获取当前值
    this.oldValue = this.vm[ this.key ];

    Dep.target = null;
  }

  update () {
    // 被调用时获取当前值
    const newValue = this.vm[ this.key ];

    if ( this.oldValue === newValue ) {
      return;
    }

    this.cb( newValue );
  }
}