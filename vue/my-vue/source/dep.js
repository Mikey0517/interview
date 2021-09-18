/**
 * Dep 收集响应式对象的依赖 watcher，当数据改变时，去通知 watcher
 */
export default class Dep {
  constructor () {
    // 用来存储 watcher 对象
    this.subs = [];
  }

  addSub ( watcher ) {
    if ( watcher && watcher.update ) {
      this.subs.push( watcher );
    }
  }

  notify () {
    this.subs.forEach( watcher => {
      watcher.update();
    } )
  }
}