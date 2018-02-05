import React from 'react'
import { DatePicker } from 'antd'
import styles from './home.less'

export const Home = (props) =>
  <div className={ styles.home }>
    <DatePicker />
  </div>
