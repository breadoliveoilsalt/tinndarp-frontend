import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { loggedInWithToken, deleteToken } from './userAccountSlice'
import './UserAccount.css'
//TEST
class AccountStatusHeader extends Component {

  signOut() {
    deleteToken()
    this.props.history.push("/")
  }

  render() {
    let content

    if (loggedInWithToken()) {
      content = (
        <div className="sign-out-link-header">
          <a href="" onClick={this.signOut}>Sign Out</a>
        </div>
      )
    } else {
      content = (
        <div className="create-account-link-header">
          <Link  to="/sign_up">Create an Account</Link>
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

export default withRouter(AccountStatusHeader)
