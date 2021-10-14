function create ( o ) {
  function F () {};
  F.prototype = o;
  return new F();
}

function prototype ( child, parent ) {
  let prototype = create( parent.prototype );
  prototype.constructor = child;
  child.prototype = prototype;
}

function Parent ( name ) {
  this.name = name;
}

Parent.prototype.sayHello = function () {
  return 'hello' + this.name;
}

function Child ( name ) {
  this.name = name;
}

prototype( Child, Parent );

let child = new Child( 'mikey' );
console.log( child.sayHello() )