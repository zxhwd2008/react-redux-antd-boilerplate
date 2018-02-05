import React from 'react'
import { Link, IndexLink } from 'react-router'
import { Menu } from 'antd'
import classnames from 'classnames'
import styles from './header.less'

export const Header = () =>
  <div className={styles.home}>
    <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">
          <Link to="/github">Github Manager</Link>
        </Menu.Item>
      </Menu>
  </div>
