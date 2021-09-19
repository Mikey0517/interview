1. webpack 中 modules 是指什么？
文件 module，ESModule、CommonJs、AMD 和 Assets （ Images、Video、Radio、JSON ）

2. webpack modules 是如何表达自己的各种依赖关系？
导入语句
ESModule import
CommonJs require
AMD define require
css @import

3. 常说的 chunk 和 bundle 的区别是什么？
Chunk 是 webpack 打包过程中 modules 的集合，是 ***打包过程中*** 的概念

webpack 的打包从一个入口模块开始，入口模块引入其他模块，其他模块引入其他模块
webpack 通过引用关系逐个打包模块，这些 module 就形成了一个 chunk

bundle 是我们最终输出的一个或多个打包好的文件

4. Chunk 和 Bundle 的关系是什么？
通常情况下 一个 Chunk 会生产一个 Bundle，也有例外

使用 sourceMap ，一个入口文件会产生一个 chunk ，对应两个 bundle

总结：Chunk 是过程中代码块， Bundle 是打包结果输出的代码块，Chunk 在构建完成就呈现为 Bundle

5. Split Chunk （ 分割 Chunk ）

6. 这段配置会产生几个 Chunk

7. Plugin 和 Loader 分别是做什么的 ？ 怎么工作

Loader 模块转换器，将 非 js 模块转换为 webpack 能识别的 js 模块
本质上，webpack loader 将所有类型的文件，转换为应用程序的 ***依赖图*** 可以直接引用的模块

Plugin 扩展插件，webpack 运行的各个阶段，都会广播出对应的事件，插件去监听对应的事件

8. Compiler 
包含了 webpack 环境的所有配置信息，包括 option， loader ， plugin。
webpack 启动时实例化，他是全局唯一的，可以把他理解为 webpack 的实例

9. Compliation
包含了当前的模块资源，编译生成资源
webpack 在开发模式下运行的时候，每当检测到一个文件变化，就会创建一个新的 Compliation

10. 简单描述一下 webpack 打包过程
### 1.初始化参数：shell webpack.config.js
### 2.开始编译：初始化一个 Complier 对象，加载所有配置
### 3.确定入口：根据 entry 中的配置，找出入口文件
### 4.编译模块：从入口文件开始，调用所有的 loader ，再去递归找依赖
### 5.完成模块编译：得到每个模块被编译后的最终内容以及它们之间的依赖关系
### 6.输出资源：根据得到的依赖关系，组装成一个个包含多个 module 的 chunk
### 7.输出完成：根据配置，确定要输出的文件名已经文件路径