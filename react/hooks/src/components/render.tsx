/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-27 13:34:16
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-29 18:58:17
 * @FilePath     : /interview/react/hooks/src/components/componentA.js
 */
import { ComponentType, useEffect, useState } from 'react'

function Render (WrappedComponent: ComponentType) {
  return () => {
    return (
      <div />
    )
  }
}

export default Render