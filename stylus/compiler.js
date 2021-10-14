const stylus = require( 'stylus' );
const fs = require( 'fs' );
const file = fs.readFileSync( './stylus.styl', 'utf-8' );

stylus.render(file, { filename: 'nesting.css' }, function(err, css){
  if (err) throw err;
  console.log(css);
});