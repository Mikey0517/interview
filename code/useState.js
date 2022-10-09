/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-09-15 13:34:35
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-09-15 13:41:27
 * @FilePath     : /interview/code/useState.js
 */
let x = [];
let index = 0;
const myUseState = (initial) => {
  let currentIndex = index;
  x[currentIndex] = x[currentIndex] === undefined ? initial : x[currentIndex];
  const setInitial = (value) => {
    x[currentIndex] = value;
    render();
  };
  index += 1;
  return [x[currentIndex], setInitial];
};
//模拟的render函数
const render = () => {
  index = 0; //将 index 重置
  //  ReactDOM.render(<App/>,document.querySelector('#root'))
  App()
};
const App = () => {
  const [n, setN] = myUseState(0);
  const [m, setM] = myUseState(0);
  console.log(n);
  console.log(m);
  return {
    n,
    m,
    setN,
    setM
  };
};

const { n, m, setN, setM } = App();
setN(n + 1)
setM(m + 2)
