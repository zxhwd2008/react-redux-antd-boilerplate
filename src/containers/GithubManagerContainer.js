import { connect } from 'react-redux'
import { Promise } from 'es6-promise'
import { GithubManager } from '../routes/GithubManager'
import {
  updateField,
  GithubManager as GithubManagerState,
} from '../modules/GithubManager'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export const GithubManagerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GithubManager)
