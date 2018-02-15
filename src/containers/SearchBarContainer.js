import { connect } from 'react-redux'
import { SearchBar } from 'components/SearchBar'
import {
  updateField,
  searchGithubUser,
  searchGithubUserStarredRepos,
} from 'modules/GithubManager'
import {
  Router as RouterState,
} from 'modules/Router'

const mapStateToProps = state => ({
  routing: RouterState.locationBeforeTransitions()(state),
})

const mapDispatchToProps = dispatch => ({
  updateField: (field, value) => dispatch(updateField(field, value)),
  searchGithubUser: (user) => dispatch(searchGithubUser(user)),
  searchGithubUserStarredRepos: (user) => dispatch(searchGithubUserStarredRepos(user)),
})

export const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)
