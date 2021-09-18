import Watcher from "./watcher.js";

export default class Compiler {
  constructor ( vm ) {
    this.vm = vm;
    this.el = vm.$el;
    this.methods = vm.$methods;

    this.complie( this.el );
  }

  complie ( el ) {
    // 首先拿到根结点的子节点
    const childNodes = el.childNodes;
    // 递归遍历子节点，类数组需要做转换
    Array.from( childNodes ).forEach( node => {
      // 文本节点
      // 元素节点
      if ( this.isTextNode( node ) ) {
        this.compileText( node );
      } else if ( this.isElementNode( node ) ) {
        this.compileElement( node );
      }
      // 有子节点
      if ( node.childNodes.length > 0 ) {
        this.complie( node );
      }
    } )
  }

  compileText ( node ) {
    const reg = /\{\{(.+?)\}\}/; // {{ msg }}
    const text = node.textContent;

    if ( reg.test( text ) ) {
      const key = RegExp.$1.trim(); // msg
      node.textContent = text.replace( reg, this.vm[ key ] );

      new Watcher( this.vm, key, newValue => {
        node.textContent = newValue;
      } )
    }
  }

  compileElement ( node ) {
    if ( node.attributes.length > 0 ) {
      Array.from( node.attributes ).forEach( attribute => {
        const name = attribute.name;

        if ( this.isDirective( name ) ) {
          const directiveName = name.indexOf( ':' ) > -1 ? name.substr( 5 ) : name.substr( 2 );
          const key = attribute.value;

          this.update( node, key, directiveName );
        }
      } )
    }
  }

  update ( node, key, directiveName ) {
    const updateFn = this[ directiveName + 'Updater' ];

    updateFn && updateFn.call( this, node, key, this.vm[ key ], directiveName );
  }

  textUpdater ( node, key, value ) {
    node.textContent = value;

    new Watcher( this.vm, key, newValue => {
      node.textContent = newValue;
    } )
  }

  modelUpdater ( node, key, value ) {
    node.value = value;

    new Watcher( this.vm, key, newValue => {
      node.value = newValue;
    } )

    // 双向绑定
    node.addEventListener( 'input', () => {
      this.vm[ key ] = node.value;
    } )
  }

  htmlUpdater ( node, key, value ) {
    node.innerHTML = value;

    new Watcher( this.vm, key, newValue => {
      node.innerHTML = newValue;
    } )
  }

  clickUpdater ( node, key, value, directiveName ) {
    node.addEventListener( directiveName, this.methods[ key ] );
  }

  /**
   * 判断是否是文本节点
   * @returns Boolean
   */
  isTextNode ( node ) {
    return node.nodeType === 3;
  }

  /**
   * 判断是否是元素节点
   * @returns Boolean
   */
  isElementNode ( node ) {
    return node.nodeType === 1;
  }

  /**
   * 判断是否是指令
   * @returns Boolean
   */
  isDirective ( name ) {
    return name.startsWith( 'v-' );
  }
}