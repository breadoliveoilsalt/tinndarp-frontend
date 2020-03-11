import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { loggedInWithToken, deleteToken } from './userAccountSlice'
import './UserAccount.css'

export class AccountStatusHeader extends Component {

  // signOut = () => {
  //   deleteToken()
  //   this.props.history.push("/")
  // }

  signOut() {
    deleteToken()
    this.props.history.push("/")
  }
  
  render() {
    let content

    if (this.props.loggedIn || loggedInWithToken()) {
      content = (
        <div className="sign-out-link-header">
          <a id="sign-out-link" href="" onClick={this.signOut}>Sign Out</a>
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

export default connect(mapStateToProps)(withRouter(AccountStatusHeader))
