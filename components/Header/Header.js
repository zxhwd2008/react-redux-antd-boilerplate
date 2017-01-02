import React from 'react'
import { Link, IndexLink } from 'react-router'
import classnames from 'classnames'
import styles from './header.scss'

export const Header = () =>
  <header className="clearfix">
    <nav className="navbar navbar-default navbar-static-top">
      <div className="navbar-header">
        <a href className="navbar-brand">
          <span className="brand-title">
            React Redux Boilerplate
          </span>
        </a>
      </div>
      <div className="navbar-collapse collapse pull-left">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="/github">Show Case</Link>
          </li>
          <li>
            <Link to="/gallery">Components Gallery</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-collapse collapse pull-right">
        <ul className="nav navbar-nav">
          <li>
            <a
              href="https://github.com/zxhwd2008"
              target="_blank">
              Created by Xiaohang Zou
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
