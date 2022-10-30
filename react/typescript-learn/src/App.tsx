/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-30 13:22:33
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-30 13:44:57
 * @FilePath     : /interview/react/typescript-learn/src/App.tsx
 */
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
