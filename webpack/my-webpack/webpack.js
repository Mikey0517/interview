const fs = require( 'fs' );
const babel = require( '@babel/core' );
const traverse = require( '@babel/traverse' ).default;
const path = require( 'path' );

let ID = 0;

const createAsset = filepath => {
  // 读取文件
  const file = fs.readFileSync( filepath, 'utf-8' );
  // 获取文件 ast
  const ast = babel.parseSync( file, {
    parserOpts: { 
      allowReturnOutsideFunction: true 
    }
  } )

  // 解析 ast 获取依赖关系
  const dependence = [];
  traverse( ast, {
    ImportDeclaration ( { node } ) {
      dependence.push( node.source.value );
    }
  } )

  // 通过 ast 编译代码
  const { code } = babel.transformFromAstSync( ast, null, {
    presets: [
      '@babel/preset-env' 
    ]
  } )

  const id = ID++;

  return {
    id,
    filepath,
    code,
    dependence
  }
}

// 获取入口文件依赖图
const createGraph = enterFilepath => {
  const mainAsset = createAsset( enterFilepath );
  const assets = [ mainAsset ];

  for ( const asset of assets ) {
    // 获取文件父级目录
    const dirname = path.dirname( asset.filepath );

    // 存储文件依赖相对路径对应文件 id
    asset.mapping = {};

    // 遍历文件的依赖
    asset.dependence.forEach( relativePath => {
      // 相对路径转 相对于 webpack 的读取路径
      const absolutePath = path.join( dirname, relativePath );

      // 获取依赖文件资源
      const childAsset = createAsset( absolutePath );

      asset.mapping[ relativePath ] = childAsset.id;

      // push 到数组，继续递归
      assets.push( childAsset );
    } )
  }

  return assets;
}

const bundle = graph => {
  let modules = '';

  graph.forEach( module => {
    modules += `${ module.id }: [
      function ( require, module, exports ) {
        ${ module.code }
      },
      ${ JSON.stringify( module.mapping ) }
    ],`
  } )

  const result = `
    ( function ( modules ) {
      function require ( id ) {
        const [ fn, mapping ] = modules[ id ];
        const module = {
          exports: {}
        }

        function localRequire ( relativePath ) {
          return require( mapping[ relativePath ] );
        }

        fn( localRequire, module, module.exports );

        return module.exports;
      }

      require( 0 );
    } )( {${ modules }} )
  `

  return result;
}

// 获取文件依赖图
const graph = createGraph( './src/index.js' );
// 通过依赖图组合最终结果
const result = bundle( graph );
console.log( result );