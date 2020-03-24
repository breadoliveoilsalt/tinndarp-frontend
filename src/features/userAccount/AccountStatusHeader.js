import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { signOutAction, tokenPresent } from './userAccountSlice'
import './UserAccount.css'

export class AccountStatusHeader extends Component {

  constructor(props) {
    super(props)
    this.signOut = this.signOut.bind(this)
  }

  signOut() {
    this.props.signOutAction()
    this.props.history.push("/")
  }

  render() {
    let content

    if (tokenPresent()) {
      content = (
        <div className="sign-out-link-header">
          Hi<br/> 
          {this.props.userEmail ? this.props.userEmail : "there!"}<br/> 
          <button id="sign-out-button-header" onClick={this.signOut}>Sign Out Here</button>
        </div>
      )
    } else {
      content = (
        <div className="not-signed-in-link-header">
          <Link to="/">Please Log In or Sign Up</Link>
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
    userEmail: state.userAccount.userEmail,
    loggedIn: state.userAccount.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOutAction: () => dispatch(signOutAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountStatusHeader))
