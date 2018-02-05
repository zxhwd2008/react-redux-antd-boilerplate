import React from 'react'
import { Layout } from 'antd'
import { Header } from '../components/Header'

export const Root = (props) =>
  <Layout className="layout">
    <Layout.Header>
      <Header />
    </Layout.Header>
    <Layout.Content style={{ padding: '0 50px' }}>
      {React.cloneElement(props.children, {routing: props.routing})}
    </Layout.Content>
  </Layout>
