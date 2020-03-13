import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Loader from '../features/apiRequests/Loader'
import RedirectComponent from '../features/userAccount/RedirectComponent'
import { authenticateUserTokenAction, updateLoggedInStatus } from '../features/userAccount/userAccountSlice'

class Authenticator extends Component {

  componentDidMount() {
    this.props.authenticateUserTokenAction()
  }

  redirectHome() {
    this.props.history.push("/")
  }

  render() {
    // let content = null

    if (this.props.authenticating) {
      return (<Loader />)
    } else if (this.props.loggedIn) {
      return  (this.props.children)
    } else {
      // {this.redirectHome()}
    // }
    // } else if (!this.props.loggedIn){
    //   content = (
    //     <RedirectComponent
    //       text="Authentication failed. Please log in or sign up."
    //       redirectTo="/"
    //       millisecondsToRedirect="2500"
    //     />
    //   )
      // this.redirectHome()
      return (
        // null
        <RedirectComponent
          text="Authentication failed. Please log in or sign up."
          redirectTo="/"
          millisecondsToRedirect="500"
        />
      )
    }
  }

    // return content
  // }

}

const mapStateToProps = state => {
  return {
    authenticating: state.apiRequest.authenticating,
    loggedIn: state.userAccount.loggedIn
  }

}

const mapDispatchToProps = dispatch => {
  return {
    updateLoggedInStatus: (bool) => dispatch(updateLoggedInStatus(bool)),
    authenticateUserTokenAction: () => dispatch(authenticateUserTokenAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Authenticator))
