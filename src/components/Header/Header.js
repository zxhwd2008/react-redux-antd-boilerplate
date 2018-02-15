import React from 'react'
import { SearchBarContainer } from 'containers/SearchBarContainer'
import styles from './header.less'

export const Header = () =>
  <div className={styles.header}>
    <div className={styles.logo} />
    <div className={styles['search-wrapper']}>
      <SearchBarContainer />
    </div>
  </div>
