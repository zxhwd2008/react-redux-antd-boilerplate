import React from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'

const Option = Select.Option

export class Filters extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    const { user, updateField, searchGithubUserStarredRepos } = this.props
    updateField('sort', value)
    searchGithubUserStarredRepos(user.login)
  }

  render() {
    const { sort } = this.props
    return (
      <Select value={sort} onChange={this.handleChange} size="large">
        <Option value="created">Recently starred</Option>
        <Option value="updated">Recently active</Option>
        <Option value="stars">Most stars</Option>
      </Select>
    )
  }
}

Filters.propTypes = {
  user: PropTypes.object,
  sort: PropTypes.string,
  updateField: PropTypes.func,
  searchGithubUserStarredRepos: PropTypes.func,
}
