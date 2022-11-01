/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-29 17:40:36
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-01 17:25:27
 * @FilePath     : /interview/react/hooks/src/layout/default-layout.tsx
 */
/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-10-27 17:48:54
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-10-28 21:22:55
 * @FilePath     : /interview/react/hooks/src/layout/default-layout.js
 */
import { useEffect, useMemo, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import routes from '../router/routes';

const { Sider, Content } = Layout;

function DefaultLayout () {
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const navigate = useNavigate()

  const items = useMemo(function () {
    const data = routes.filter(route => route.key === 'default-layout')[0].children

    return data.filter(route => route.key !== '/')
  }, [])

  const handleClick = (params: {keyPath: string[]}) => {
    const path = `/${params.keyPath.slice().reverse().join('/')}`
    if (path !== location.pathname) {
      navigate(path)
    }
  }

  useEffect(() => {
    const pathArr = location.pathname.split('/').slice(1)
    setSelectedKeys(pathArr)
    setOpenKeys(pathArr.slice(0, pathArr.length - 1))
  }, [location.pathname])

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    setOpenKeys(keys)
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider>
        <Menu
          style={{ height: '100%', overflow: 'hidden auto' }}
          items={ items }
          selectedKeys={ selectedKeys }
          openKeys={ openKeys }
          onClick={ handleClick }
          onOpenChange={ onOpenChange }
          mode="inline"
        />
      </Sider>
      <Layout style={{ overflow: 'auto' }}>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout