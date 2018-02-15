import React from 'react'
import { Row, Col, List } from 'antd'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { IconText } from 'components/IconText'
import { UserCard } from './UserCard'
import { Filters } from './Filters'
import styles from './starred-repos-list.less'

export class StarredReposList extends React.Component {
  componentDidMount() {
    const { updateField } = this.props
    updateField('repository', null)
  }

  componentDidUpdate() {
    window.scrollTo(0, 0)
  }

  render() {
    const { user, totalStarredRepos,
      starredRepos, sort, page,
      updateField, searchGithubUserStarredRepos } = this.props

    if (user === null || totalStarredRepos === null ||
    starredRepos === null) {
      return (<div />)
    }

    const pagination = {
      pageSize: 30,
      current: page,
      total: totalStarredRepos,
      onChange: (newPage) => {
        updateField('page', newPage)
        searchGithubUserStarredRepos(user.login)
      },
    }

    return (
      <Row gutter={24} className={styles['starred-repos-list-wrapper']}>
        <Col xs={24} sm={10} md={8}>
          <UserCard user={user} />
        </Col>
        <Col xs={24} sm={14} md={16}>
          <div className={styles['filters-wrapper']}>
            <Filters
              sort={sort}
              user={user}
              searchGithubUserStarredRepos={searchGithubUserStarredRepos}
              updateField={updateField}
            />
          </div>
          <List
            itemLayout="vertical"
            size="large"
            pagination={pagination}
            dataSource={starredRepos}
            renderItem={item => (
              <List.Item
                key={item.full_name}
                actions={[
                  <IconText type="info-circle" text={item.language || 'no info'} />,
                  <IconText type="star" text={item.stargazers_count} />,
                  <IconText type="fork" text={item.forks_count} />]}
              >
                <List.Item.Meta
                  title={<Link to={'/' + item.full_name}>{item.full_name}</Link>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    )
  }
}

StarredReposList.propTypes = {
  user: PropTypes.object,
  updateField: PropTypes.func,
  searchGithubUserStarredRepos: PropTypes.func,
  totalStarredRepos: PropTypes.number,
  starredRepos: PropTypes.array,
  page: PropTypes.number,
  sort: PropTypes.string,
}
