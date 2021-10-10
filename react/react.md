## react fiber

1. 对于 react 原理的理解
2. 对于新技术的敏感程度，求知欲

为了使 react 的渲染过程可以被中断，可以将控制权交还给浏览器，可以让位给高优先级的任务，浏览器空闲后再恢复渲染。

对于计算量比较大的 js 计算或者 dom 计算，就不会显得特别卡顿，而是一帧一帧的有规律的执行任务。

```js
const tasts = [];

function * run () {
  let task;
  
  while ( task = tasks.shift() ) {
    if ( hasHighPriorityTask() ) {
      yield;
    }
    execute( task );
  }
}

const iterator = run();
iterator.next();
```

1. generator 有类似的功能，为什么不直接使用？

* 要使用 generator ，需要将涉及到的代码都包装成 generator * 的形式，是非常麻烦的，工作量很大。
* generator 内部是有状态的

```js
function * doWork ( a, b, c ) {
  const x = doExpendsiveWorkA( a );
  yield;
  const y = doExpendsiveWorkB( b );
  yield;
  const z = doExpendsiveWorkC( x, y, c );
  yield;
}
```

我们已经执行完了 doExpendsiveWorkA 和 doExpendsiveWorkB，还未执行 doExpendsiveWorkC。

如果此时 b 被更新了，那么在更新时间分片里，我们只能沿用之前获取到的 x，y 的结果

2. 如何判断当前是否有高优先级的任务？

当前 js 的环境下并没有办法去判断是否有高优先级的的任务

只能约定一个合理的执行时间，当超过了这个执行时间，如果任务还没有执行完成，中断当前任务，将控制权交给浏览器

人眼每秒 60 帧， 1000 ms / 60 帧 = 16 ms。

requestIdleCallback。

使浏览器在**有空的时候**执行我们的回调，这个回调会传入一个参数，表示浏览器有多少时间供我们执行任务

* 浏览器在一帧内要做什么事

处理用户输入事件
js 的执行
requestAnimation 调用
布局 layout
绘制 paint

* 浏览器很忙怎么办？

requestIdleCallback timeout 参数， 100 ms， 如果超过这个 timeout 后， 回调还没有被执行，那么会在下一帧强制执行

16 ms
16 ms
16 ms
16 ms
...
16 ms > 100 ms
强制执行回调.

* 兼容性？

requestIdleCallback 兼容性很差，通过 messageChannel 模拟实现了 requestIdleCallback 的功能

* timeout 超时之后一定会被执行吗 ？

task console.log()； requestIdleCallback， timeout 100 ms

不是的，react 里预定了 5 个优先级等级

* Immediate 最高优先级，这个优先级的任务应该被马上执行不能中断
* UserBlocking 这些任务一般是用户交互的结果，需要及时得到反馈
* Normal 不需要用户立即就能感受到的变化，比如网路请求
* Low 这些任务可以延后，但最终也需要被执行
* Idle 可以被无限期延后，只要他前面有高于他优先级的任务

## 平时用过高阶组件吗？ 什么是高阶组件？高阶组件能用来做什么？

简称 HOC， High Order Components
1. 是一个函数
2. 入参：原来的 react 组件
3. 返回值：新的 react 组件
4. 是一个纯函数。不应该有任何的副作用

```js
function helloWorld () {
  const myName = seesionStorage.getItem( 'xuyang' );
  console.log( `hello beautiful world, my name is ${ myName }` );
}

function byeWorld () {
  const myName = seesionStorage.getItem( 'xuyang' );
  console.log( `bye ugly world, my name is ${ myName }` );
}
```

```js
function helloWorld ( myName ) {
  console.log( `hello beautiful world, my name is ${ myName }` );
}

function byeWorld ( myName ) {
  console.log( `bye ugly world, my name is ${ myName }` );
}

function wrapWithUserName ( wrappedFunc ) {
  const tempFunction = () => {
    const myName = seesionStorage.getItem( 'xuyang' );
    wrappedFunc( myName );
  }
  return tempFunction;
}

const wrappedHello = wrapWithUserName( helloWorld );
const wrappedBye = wrapWithUserName( byeWorld );

wrappedHello();
wrappedBye();
```

### 怎么写一个高阶组件？

1. 普通方式
2. 装饰器
3. 多个高阶组件的结合

### 高阶组件能用来做什么？ 技术层面上

1. 属性代理
  1.1 操作 props
  1.2 操作组件实例

2. 继承/劫持

## 什么是 react hooks ？ React hooks 有什么优势 ？

可以不写 class 组件的情况下，使用 state 和 其他 react 特性

useState
useEffect
useMemo
