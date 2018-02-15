import { connect } from 'react-redux'
import { ReposDetails } from 'routes/ReposDetails'
import {
  searchGithubRepos,
  GithubManager as GithubManagerState,
} from 'modules/GithubManager'

const mapStateToProps = state => ({
  repository: GithubManagerState.repository()(state),
})

const mapDispatchToProps = dispatch => ({
  searchGithubRepos: (user, repos) => dispatch(searchGithubRepos(user, repos)),
})

export const GithubReposDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReposDetails)
