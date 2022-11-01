/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-01 17:28:55
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-01 17:33:12
 * @FilePath     : /interview/react/hooks/src/pages/batch-update.tsx
 */
/*
autoBatch演示demo
react18中只要处于同一上下文中的setState都会被合并更新，若想强制立即更新可以使用flushSync
 */
import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";

function BatchUpdate () {
  const [a, setA] = useState(0);
  const aRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    Promise.resolve().then(() => {
      flushSync(() => {
        setA(1);
      });
      //setA(1);
      console.log("effect", aRef.current!.innerText);
      setA(2);
      console.log("effect", aRef.current!.innerText);
    });
  }, []);
  return (
    <div className="App">
      <h1
        onClick={() => {
          setA(3);
          console.log("click", aRef.current!.innerText);
          setA(4);
          console.log("click", aRef.current!.innerText);
        }}
      >
        add
      </h1>
      <h2 ref={aRef}>{a}</h2>
    </div>
  );
}

export default BatchUpdate