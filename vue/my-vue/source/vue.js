import Observer from "./observer.js";
import Compiler from "./compiler.js";

export default class Vue {
  constructor ( options = {} ) {
    this.$options = options;
    this.$data = options.data;
    this.$methods = options.methods;

    // 初始化 dom
    this.initCreateElement( this.$options );

    // 将响印式对象代理到 Vue 实例上
    this._proxyData( this.$data );

    // 实例化 Observer 对象
    new Observer( this.$data );

    // 编译模版 v-html v-click
    new Compiler( this );
  }

  initCreateElement ( options ) {
    const { el } = options;
    if ( typeof el === 'string' ) {
      this.$el = document.querySelector( el );
    }

    if ( el instanceof HTMLElement ) {
      this.$el = el;
    }

    if ( !el ) {
      throw Error( "找不到对应的 Dom" )
    }
  }

  _proxyData ( data ) {
    Object.keys( data ).forEach( key => {
      Object.defineProperty( this, key, {
        enumerable: true,
        configurable: true,
        get () {
          return data[ key ];
        },
        set ( newValue ) {
          if ( newValue === data[ key ] ) {
            return;
          }

          data[ key ] = newValue;
        }
      } )
    } )
  }
}