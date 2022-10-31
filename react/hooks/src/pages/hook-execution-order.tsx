/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-27 18:03:43
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-27 23:28:37
 * @FilePath     : /interview/react/hooks/src/pages/hook-execution-order.js
 */
import { useEffect, useState } from "react"
import { Button } from "antd"

function HookExecutionOrder () {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  console.log('render')

  useEffect(() => {
    console.log('effect render')

    return () => {
      console.log('effect end')
    }
  }, [count])

  return (
    <Button onClick={ handleClick }>点击{ count }</Button>
  )
}

export default HookExecutionOrder