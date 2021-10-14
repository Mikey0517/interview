const Renderer = require( 'stylus/lib/renderer.js' );
const Parser = require( './node_modules/stylus/lib/parser.js' );
const nodes = require( './node_modules/stylus/lib/nodes/index.js' );
const Compiler = require( './node_modules/stylus/lib/visitor/compiler.js' );
const fs = require( 'fs' );

const trim = function ( str ) {
  return str.replace( /^\s+|\s+$/g, '' );
}

const entry = fs.readFileSync( './stylus.styl', 'utf-8' );
const variable = fs.readFileSync( './variable.styl', 'utf-8' );
const lines = variable.split( '\n' );
const variableObj = {};
for ( let i = 0; i < lines.length; i++ ) {
  const arr = lines[ i ].split( '=' );
  const key = trim( arr[ 0 ] );
  const value = trim( arr[ 1 ] );
  variableObj[ key ] = value;
}
Renderer.prototype.render = function () {
  var parser = this.parser = new Parser(this.str, this.options);

  // use plugin(s)
  for (var i = 0, len = this.options.use.length; i < len; i++) {
    this.use(this.options.use[i]);
  }

  try {
    nodes.filename = this.options.filename;
    // parse
    var ast = parser.parse();
    ast = deep( ast.nodes );
    // evaluate
    this.evaluator = new this.options.Evaluator(ast, this.options);
    this.nodes = nodes;
    this.evaluator.renderer = this;
    ast = this.evaluator.evaluate();

    // normalize
    // var normalizer = new Normalizer(ast, this.options);
    // ast = normalizer.normalize();

    // compile
    var compiler = new Compiler(ast, this.options);
    var css = compiler.compile();
    console.log('%c [ css ]', 'font-size:13px; background:pink; color:#bf2c9f;', css)

    // expose sourcemap
    if (this.options.sourcemap) this.sourcemap = compiler.map.toJSON();
  } catch (err) {
    console.log('%c [ err ]', 'font-size:13px; background:pink; color:#bf2c9f;', err)
  }
}
const render = new Renderer( entry, {} ).render();

// const parser = new Parser( entry, {} );

// console.log( variableObj )

// let ast = parser.parse();

function deep ( root ) {
  let _nodes = [];

  for ( let i = 0; i < root.length; i++ ) {
    const node = root[ i ];
    let res = false;
    if ( node instanceof nodes.Group ) {
      for ( let j = 0; j < node.nodes.length; j++ ) {
        node.nodes[ j ].block.nodes = deep( node.nodes[ j ].block.nodes )
      }
    } 
    if ( node instanceof nodes.Property ){
      for ( let k = 0; k < node.expr.nodes.length; k++ ) {
        if ( node.expr.nodes[ k ] instanceof nodes.Ident && variableObj[ node.expr.nodes[ k ].string ] !== void 0 ) {
          res = true;
          continue;
        }
      }
    }

    if ( res ) {
      _nodes.push( node );
    }
  }

  return _nodes;
}

// // ast = deep( ast.nodes );
// const compiler = new Compiler( ast );
// console.log( compiler.compile() )


// .block.nodes[ 0 ].expr.nodes
// console.debug( ast.nodes[ 0 ].nodes[ 0 ] )