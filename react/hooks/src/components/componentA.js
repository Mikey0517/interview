/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-27 13:34:16
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-29 18:58:17
 * @FilePath     : /interview/react/hooks/src/components/componentA.js
 */
import { useEffect, useState } from 'react'

function ComponentA () {
  const [count, setCount] = useState(0)

  console.log('render')

  useEffect(function () {
    console.log('effect render')

    return function () {
      console.log('effect end test')
    }
  }, [])

  useEffect(function () {
    console.log('effect render', count)

    return function () {
      console.log('effect end', count)
    }
  }, [count])

  return (
    <div>
      组件A
    </div>
  )
}

export default ComponentA