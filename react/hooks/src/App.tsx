/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-29 17:40:36
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-31 18:13:50
 * @FilePath     : /interview/react/hooks/src/App.tsx
 */
/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-24 14:44:13
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-27 18:33:07
 * @FilePath     : /interview/react/hooks/src/App.js
 */
import { RouterProvider } from "react-router-dom";
import router from "./router";
import './App.css';

function App() {
  return (
    <RouterProvider
      router={ router }
    />
  );
}

export default App;
