import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AccountForm from './AccountForm'
import ErrorsDisplay from '../apiRequests/ErrorsDisplay'
import { submitCreateAccount, resetUserAccountState } from './userAccountSlice'
import './UserAccount.css'

export class CreateAccountContainer extends Component {

  constructor(props) {
    super(props)
    this.handleCreateAccount = this.handleCreateAccount.bind(this)
  }

// TEST!
  handleCreateAccount(e) {
    e.preventDefault()
    this.props.resetUserAccountState()
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    this.props.submitCreateAccount(credentials)
  }

  render() {

    let content

    if (this.props.loggedIn) {
      content = (
        <div>
          <div className="large-text">You're already logged in! Please click below to start browsing items.</ div>
          <Link className="link" to="/browse">Start browsing!</Link>
        </div>
      )
    } else {
       content = (
          <div>
            <div className="large-text">Sign Up for an Account! </ div>
            {this.props.errors ? <ErrorsDisplay /> : null}
            <AccountForm action={this.handleCreateAccount} />
          </div>
        )
    }

    return content
  }

}

const mapStateToProps = (state) => {
  return {
    errors: state.apiRequest.errors,
    loggedIn: state.userAccount.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetUserAccountState: () => dispatch(resetUserAccountState()),
    submitCreateAccount: (credentials) => dispatch(submitCreateAccount(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountContainer)
