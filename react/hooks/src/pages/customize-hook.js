/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-27 23:55:21
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-28 00:44:51
 * @FilePath     : /interview/react/hooks/src/pages/customize-hook.js
 */
import { Component, useEffect } from "react"

class CustmizeClass extends Component {
  componentDidMount () {
    console.log('did mount')
  }

  render () {
    return (
      <div>class</div>
    )
  }
}

function CustmizeHook () {
  return (
    <div>hook</div>
  )
}

function hookHoc (WrappedComponent) {

  return function () {
    useEffect(() => {
      console.log('effect render')
    }, [])

    return (
      <div>
        <div>Hook 高阶</div>
        <WrappedComponent />
      </div>
    )
  }
}

function classHoc (WrappedComponent) {
  return class extends Component {
    render () {
      return (
        <div>
          <div>class 高阶</div>
          <WrappedComponent />
        </div>
      )
    }
  }
}

function classInheritHoc (WrappedComponent) {
  return class extends WrappedComponent {
    componentDidMount () {
      // super.componentDidMount()
    }

    render () {
      return super.render()
    }
  }
}

export default classInheritHoc(CustmizeClass)