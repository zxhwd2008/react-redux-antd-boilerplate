import React from 'react'
import { Row, Col, Icon, Button } from 'antd'
import { browserHistory } from 'react-router'
import { IconText } from 'components/IconText'
import PropTypes from 'prop-types'
import styles from './repos-details.less'

export class ReposDetails extends React.Component {
  componentDidMount() {
    const { routing, searchGithubRepos } = this.props
    const params = routing.pathname.split('/')
    searchGithubRepos(params[1], params[2])
  }

  render() {
    const { repository } = this.props
    if (!repository) {
      return (<div />)
    }
    return (
      <div className={styles['repos-details-wrapper']}>
        <Row>
          <Col span={24}>
            <Button onClick={() => { browserHistory.push('/') }}>
              <Icon type="left" />Backward
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h1>
              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                { repository.full_name }
              </a>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <p>{ repository.description }</p>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={12} sm={5}>
            <IconText type="tag" text={repository.language} />
          </Col>
          <Col xs={12} sm={5}>
            <IconText type="file" text={repository.license && repository.license.spdx_id} />
          </Col>
        </Row>
        <Row gutter={10}>
          <Col xs={12} sm={5}>
            <IconText type="eye" text="Watch" /><span> {repository.subscribers_count}</span>
          </Col>
          <Col xs={12} sm={5}>
            <IconText type="star" text="Star" /><span> {repository.stargazers_count}</span>
          </Col>
          <Col xs={12} sm={5}>
            <IconText type="fork" text="Fork" /><span> {repository.forks_count}</span>
          </Col>
          <Col xs={12} sm={5}>
            <IconText type="question-circle" text="Issues" />
            <span> {repository.open_issues_count}</span>
          </Col>
        </Row>
      </div>
    )
  }
}

ReposDetails.propTypes = {
  routing: PropTypes.object,
  repository: PropTypes.object,
  searchGithubRepos: PropTypes.func,
}
