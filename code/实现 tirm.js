function tirm ( str ) {
  return str.replace( /^\s+|\s+$/g, '' )
}

console.log( tirm( '             ssdfs              ' ) )