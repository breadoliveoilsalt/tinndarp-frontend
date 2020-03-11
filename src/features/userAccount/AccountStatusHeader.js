import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { loggedInWithToken, deleteToken, updateLoggedInStatus } from './userAccountSlice'
import './UserAccount.css'

export class AccountStatusHeader extends Component {

  constructor(props) {
    super(props)
    this.signOut = this.signOut.bind(this)
  }

  signOut() {
    deleteToken()
    this.props.updateLoggedInStatus(false)
    this.props.history.push("/")
  }

  render() {
    let content

    if (this.props.loggedIn || loggedInWithToken()) {
      content = (
        <div className="sign-out-link-header">
          <button id="sign-out-button-header" onClick={this.signOut}>Sign Out</button>
        </div>
      )
    } else {
      content = (
        <div className="create-account-link-header">
          <Link to="/sign_up">Create an Account</Link>
        </div>
      )
    }

    return (
      <div className="account-status-header">
        {content}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.userAccount.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoggedInStatus: (bool) => dispatch(updateLoggedInStatus(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountStatusHeader))
