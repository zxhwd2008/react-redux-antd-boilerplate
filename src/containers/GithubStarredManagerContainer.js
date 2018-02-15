import { connect } from 'react-redux'
import { StarredReposList } from 'routes/GithubStarredManager'
import {
  updateField,
  searchGithubUserStarredRepos,
  GithubManager as GithubManagerState,
} from 'modules/GithubManager'

const mapStateToProps = state => ({
  user: GithubManagerState.user()(state),
  totalStarredRepos: GithubManagerState.totalStarredRepos()(state),
  starredRepos: GithubManagerState.starredRepos()(state),
  page: GithubManagerState.page()(state),
  sort: GithubManagerState.sort()(state),
})

const mapDispatchToProps = dispatch => ({
  updateField: (field, value) => dispatch(updateField(field, value)),
  searchGithubUserStarredRepos: (user) => dispatch(searchGithubUserStarredRepos(user)),
})

export const GithubStarredManagerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredReposList)
