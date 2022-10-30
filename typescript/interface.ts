/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-30 18:09:44
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-30 18:40:17
 * @FilePath     : /interview/typescript/interface.ts
 */
type Route = {
  label: string;
  key: string;
  path: string;
  children?: Array<Route>
}

const routes: Array<Route> = [
  {
    label: '默认布局',
    key: '默认布局',
    path: '/',
    children: [
      {
        label: '首页',
        key: '首页',
        path: '/home',
      },
      {
        label: '复业',
        key: '复业',
        path: '/two',
      }
    ]
  }
]