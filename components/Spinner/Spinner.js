import React from 'react'
import classnames from 'classnames'
import styles from './spinner.scss'

export const Spinner = () =>
  <div className={styles['sk-fading-circle']}>
    <div className={classnames(styles['sk-circle1'], styles['sk-circle'])} />
    <div className={classnames(styles['sk-circle2'], styles['sk-circle'])} />
    <div className={classnames(styles['sk-circle3'], styles['sk-circle'])} />
    <div className={classnames(styles['sk-circle4'], styles['sk-circle'])} />
    <div className={classnames(styles['sk-circle5'], styles['sk-circle'])} />
    <div className={classnames(styles['sk-circle6'], styles['sk-circle'])} />
    <div className={classnames(styles['sk-circle7'], styles['sk-circle'])} />
    <div className={classnames(styles['sk-circle8'], styles['sk-circle'])} />
    <div className={classnames(styles['sk-circle9'], styles['sk-circle'])} />
    <div className={classnames(styles['sk-circle10'], styles['sk-circle'])} />
    <div className={classnames(styles['sk-circle11'], styles['sk-circle'])} />
    <div className={classnames(styles['sk-circle12'], styles['sk-circle'])} />
  </div>
