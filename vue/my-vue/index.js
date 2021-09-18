import Vue from './source/vue.js';

const vm = new Vue( {
  el: '#app',
  data: {
    msg: 'xuyanghaoyue',
    html: '<div style="color: red;">4444</div>',
    text: 656565
  },
  methods: {
    handleClick () {
      console.log( "我被点击了" )
    }
  }
} )

console.log( vm );