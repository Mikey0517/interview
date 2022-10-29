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
import routes from '../router/routes';

const { Sider, Content } = Layout;

function DefaultLayout () {
  const location = useLocation()
  const [current, setCurrent] = useState(location.pathname.split('/')[1])
  const navigate = useNavigate()

  const items = useMemo(function () {
    const data = routes.filter(route => route.key === 'default-layout')[0].children

    return data.filter(route => route.key !== '/')
  }, [])

  const handleClick = (params) => {
    navigate(params.key)
  }

  useEffect(() => {
    setCurrent(location.pathname.split('/')[1])
  }, [location.pathname])

  return (
    <Layout style={{ height: '100vh', overflow: 'auto' }}>
      <Sider>
        <Menu items={ items } selectedKeys={ [current] } onClick={ handleClick }/>
      </Sider>
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout