import { connect } from 'react-redux'
import { Promise } from 'es6-promise'
import { GithubManager } from '../routes/GithubManager'
import {
  updateField,
  send,
  GithubManager as GithubManagerState,
} from '../modules/Customer'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  send: () => new Promise((resolve, reject) => dispatch(send(resolve, reject)))
    .then(() => dispatch(updateField('showSuccessMessage', true)), () => {})
  updateFormField: (field, value) => dispatch(change('customer', field, value)),
})

export const CustomerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GithubManager)
