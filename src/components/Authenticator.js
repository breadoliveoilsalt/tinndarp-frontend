import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Loader from '../features/apiRequests/Loader'
import LogInSignUpLinks from '../features/userAccount/LogInSignUpLinks'
import { authenticateUserTokenAction, updateLoggedInStatus, tokenPresent } from '../features/userAccount/userAccountSlice'

class Authenticator extends Component {

  componentDidMount() {
    if (tokenPresent()) {
      this.props.authenticateUserTokenAction()
    }
  }

  render() {

    if (this.props.authenticating) {
      return (<Loader />)
    } else if (this.props.loggedIn && tokenPresent()) {
      return  (this.props.children)
    } else {
      return (<LogInSignUpLinks />)
    }
  }
}

const mapStateToProps = state => {
  return {
    authenticating: state.apiRequest.authenticating,
    loggedIn: state.userAccount.loggedIn
  }

}

const mapDispatchToProps = dispatch => {
  return {
    // updateLoggedInStatus: (bool) => dispatch(updateLoggedInStatus(bool)),
    authenticateUserTokenAction: () => dispatch(authenticateUserTokenAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Authenticator))
