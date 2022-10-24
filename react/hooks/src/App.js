/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-24 14:44:13
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-24 19:31:44
 * @FilePath     : /interview/react/hooks/src/App.js
 */
import { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  console.log('render')

  useEffect(() => {
    console.log('effect', count)

    return () => {
      console.log('effect end', count)
    }
  }, [count])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          className="App-link"
          onClick={handleClick}
        >
          点击{ count }
        </button>
      </header>
    </div>
  );
}

export default App;
