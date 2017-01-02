import { connect } from 'react-redux'
import { Root } from '../routes/Root'
import {
  Router as RouterState,
} from '../modules/Router'

const mapStateToProps = state => ({
  routing: RouterState.locationBeforeTransitions()(state),
})

export const RootContainer = connect(
  mapStateToProps
)(Root)
