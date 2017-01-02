import React from 'react'
import styles from './tooltip.scss'

export const Tooltip = ({ title, text }) =>
  <a title={text} className={styles.tooltip}>{title}</a>

Tooltip.propTypes = {
  title: React.PropTypes.string,
  text: React.PropTypes.string,
}
