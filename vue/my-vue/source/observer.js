import Dep from "./dep.js";
/**
 * Observer 观察者，递归遍历响应式对象属性，添加 getter 和 setter 
 */
export default class Observer {
  constructor ( data ) {
    this.traverse( data );
  }

  traverse ( data ) {
    console.log( data )
    if ( typeof data !== 'object' ) {
      return;
    }

    Object.keys( data ).forEach( key => {
      this.defineReactive( data, key, data[ key ] );
    } )
  }

  defineReactive ( obj, key, val ) {
    const that = this;
    this.traverse( val );
    const dep = new Dep();

    Object.defineProperty( obj, key, {
      enumerable: true,
      configurable: true,
      get () {
        Dep.target && dep.addSub( Dep.target );
        return val;
      },
      set ( newValue ) {
        if ( newValue === val ) {
          return;
        }
console.log( newValue, val )
        val = newValue;
        that.traverse( newValue );
        dep.notify();
      }
    } )
  }
}