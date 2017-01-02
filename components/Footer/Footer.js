import React from 'react'
import { Link } from 'react-router'
import styles from './footer.scss'

export const Footer = () =>
  <footer className={styles.footer}>
    <div className="container">
      <p className={styles['text-muted']}>©{new Date().getFullYear()} Xiaohang Zou</p>
    </div>
  </footer>
