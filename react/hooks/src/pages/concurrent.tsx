/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-01 12:53:58
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-01 17:28:17
 * @FilePath     : /interview/react/hooks/src/pages/concurrent.tsx
 */
import { useState, useTransition } from "react";

/**
 * concurrent rendering体验demo
 */
function Concurrent () {
  const [a, setA] = useState('');
  const [isConcurrent, setIsConcurrent] = useState(false);
  const [isPending, startTransition] = useTransition();
  return (
    <div>
      <button onClick={() => setIsConcurrent((pre) => !pre)}>
        {isConcurrent ? "concurrent" : "legacy"}
      </button>
      <input
        onChange={(e) => {
          isConcurrent
            ? startTransition(() => setA(e.target.value))
            : setA(e.target.value);
        }}
      />
      {Array(10000)
        .fill(0)
        .map((_, i) => {
          return <div key={i}>{a}</div>;
        })}
    </div>
  );
}

export default Concurrent