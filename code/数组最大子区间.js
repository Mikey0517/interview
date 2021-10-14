function maxRange ( arr ) {
  let max = arr[ 0 ];
  let pre = arr[ 0 ];

  for ( let i = 1; i < arr.length; i++ ) {
    pre = Math.max( arr[ i ], arr[ i ] + pre );
    max = Math.max( pre, max );
  }

  return max;
}

console.log( maxRange( [ 31, -41, 59, 26, -53, 58, 97, -93, -23, 84 ] ) )
// pre 已 i 结尾 的子区间和最大值， max pre 里的最大值
// pre = 31, max = 31
// pre = -10, max = 31
// pre = 59, max = 59
// pre = 85, max = 85
// pre = 32, max = 85
// pre = 90, max = 90