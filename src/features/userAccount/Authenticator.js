import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { authenticateUserTokenAction, tokenPresent } from './userAccountSlice'
import { deleteErrors, loadErrors } from '../apiRequests/apiRequestsSlice'
import ErrorsDisplay from '../../components/ErrorsDisplay'
import LogInSignUpLinks from './LogInSignUpLinks'

class Authenticator extends Component {

  componentDidMount() {
    if (tokenPresent()) {
      this.props.authenticateUserTokenAction()
    }
  }

  render() {
    if (this.props.loggedIn && tokenPresent()) {
      return (this.props.children)
    } else {
      return (
        <div>
          <ErrorsDisplay 
            errors= {["Not authorized to access", "Please sign in to get or renew token"]}
          />
          <LogInSignUpLinks />
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.userAccount.loggedIn
  }

}

const mapDispatchToProps = dispatch => {
  return {
    authenticateUserTokenAction: () => dispatch(authenticateUserTokenAction()),
    loadErrors: (errorsList) => dispatch(loadErrors(errorsList)),
    deleteErrors: () => dispatch(deleteErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Authenticator))
