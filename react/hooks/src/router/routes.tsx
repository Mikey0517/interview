/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-29 17:40:36
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-01 17:34:57
 * @FilePath     : /interview/react/hooks/src/router/routes.tsx
 */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DefaultLayout } from '../layout'
import HookExecutionOrder from '../pages/hook-execution-order'
import CustmizeHook from '../pages/customize-hook'
import Concurrent from '../pages/concurrent'
import BatchUpdate from '../pages/batch-update'

interface RedirectProps {
  to: string
}

function Redirect({ to }: RedirectProps) {
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
      },
      {
        label: 'React 18 新特性学习',
        key: 'react-18-characteristic',
        path: "react-18-characteristic",
        children: [
          {
            label: 'Concurrent Render',
            key: 'concurrent',
            path: "concurrent",
            element: <Concurrent />,
          },
          {
            label: 'BatchUpdate',
            key: 'batch-update',
            path: "batch-update",
            element: <BatchUpdate />,
          }
        ]
        // loader: teamLoader,
      }
    ],
  },
]

export default routes