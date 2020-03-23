import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LogInSignUpLinks from './LogInSignUpLinks'
import { authenticateUserTokenAction, tokenPresent } from './userAccountSlice'
import { loadErrors } from '../apiRequests/apiRequestsSlice'

class Authenticator extends Component {

  componentDidMount() {
    if (tokenPresent()) {
      this.props.authenticateUserTokenAction()
    }
  }

  render() {
    // if (this.props.fetching) {
    //   return (<Loader />)
    // } else if (this.props.loggedIn && tokenPresent()) {
    //   return (this.props.children)
    // } else {
    //   return (<LogInSignUpLinks />)
    // }
    if (this.props.loggedIn && tokenPresent()) {
      return (this.props.children)
    } else {
      loadErrors(["Not authorized to access", "Please sign in to get token"])
      return ( <LogInSignUpLinks />)
    }
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.apiRequest.fetching,
    loggedIn: state.userAccount.loggedIn
  }

}

const mapDispatchToProps = dispatch => {
  return {
    authenticateUserTokenAction: () => dispatch(authenticateUserTokenAction()),
    loadErrors: (errorsList) => dispatch(loadErrors(errorsList))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Authenticator))
