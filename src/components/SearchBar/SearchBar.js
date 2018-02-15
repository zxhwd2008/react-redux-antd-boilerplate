import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
const Search = Input.Search

export class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.onUserSearch = this.onUserSearch.bind(this)
  }

  onUserSearch(username) {
    this.props.updateField('page', 1)
    this.props.updateField('sort', 'created')
    this.props.searchGithubUser(username)
    this.props.searchGithubUserStarredRepos(username)
  }

  render() {
    const { pathname } = this.props.routing
    if (pathname !== '/') {
      return (<div />)
    }
    return (
      <Search
        placeholder="Search github user"
        onSearch={this.onUserSearch}
        enterButton
      />)
  }
}

SearchBar.propTypes = {
  updateField: PropTypes.func,
  searchGithubUser: PropTypes.func,
  searchGithubUserStarredRepos: PropTypes.func,
  routing: PropTypes.object,
}
