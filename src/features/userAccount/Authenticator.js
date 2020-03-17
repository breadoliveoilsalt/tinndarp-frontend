import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Loader from '../../components/Loader'
import LogInSignUpLinks from './LogInSignUpLinks'
import { authenticateUserTokenAction, tokenPresent } from './userAccountSlice'

class Authenticator extends Component {

  componentDidMount() {
    if (tokenPresent()) {
      this.props.authenticateUserTokenAction()
    }
  }

  render() {

    if (this.props.fetching) {
      return (<Loader />)
    } else if (this.props.loggedIn && tokenPresent()) {
      return (this.props.children)
    } else {
      return (<LogInSignUpLinks />)
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
    authenticateUserTokenAction: () => dispatch(authenticateUserTokenAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Authenticator))
