/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-27 18:21:33
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-28 01:01:49
 * @FilePath     : /interview/react/hooks/src/router/routes.js
 */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DefaultLayout } from '../layout'
import HookExecutionOrder from '../pages/hook-execution-order'
import CustmizeHook from '../pages/customize-hook'

function Redirect({ to }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, [navigate, to]);

  return null;
}

const routes = [
  {
    label: '默认布局',
    key: 'default-layout',
    path: "/",
    element: <DefaultLayout />,
    // loader: rootLoader,
    children: [
      {
        label: '重定向',
        key: '/',
        path: "/",
        element: <Redirect to='hook-execution-order' />,
      },
      {
        label: 'Hook 执行顺序',
        key: 'hook-execution-order',
        path: "hook-execution-order",
        element: <HookExecutionOrder />,
        // loader: teamLoader,
      },
      {
        label: '自定义 Hook',
        key: 'customize-hook',
        path: "customize-hook",
        element: <CustmizeHook />,
        // loader: teamLoader,
      }
    ],
  },
]

export default routes