import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { LocaleProvider, Spin, Layout } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import { Header } from '../components/Header'
import styles from './root.less'

export const Root = (props) =>
  <div>
    <LocaleProvider locale={enUS}>
      <Spin size="large" spinning={props.currentTask > 0} >
        <Layout className={classnames('layout', styles.container)}>
          <Layout.Header className={styles['header-wrapper']}>
            <Header />
          </Layout.Header>
          <Layout.Content className={styles['content-wrapper']}>
            {
              React.cloneElement(props.children,
                {
                  routing: props.routing,
                })
            }
          </Layout.Content>
        </Layout>
      </Spin>
    </LocaleProvider>
  </div>


Root.propTypes = {
  currentTask: PropTypes.number,
  children: PropTypes.object,
  routing: PropTypes.object,
}
