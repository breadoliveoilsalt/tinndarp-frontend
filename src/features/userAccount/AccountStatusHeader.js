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
          <a onClick={this.signOut}>Sign Out</a>
      )
    } else {
      content = (
        <Link to="/sign_up">Create an Account!</Link>
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
