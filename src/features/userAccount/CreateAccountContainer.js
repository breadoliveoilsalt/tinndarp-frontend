import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AccountForm from './AccountForm'
import ErrorsDisplay from '../apiRequests/ErrorsDisplay'
import Loader from '../apiRequests/Loader'
import { resetAPIRequestState } from '../apiRequests/apiRequestSlice'
import { submitCreateAccount } from './userAccountSlice'

import './UserAccount.css'

export class CreateAccountContainer extends Component {

  constructor(props) {
    super(props)
    this.handleCreateAccount = this.handleCreateAccount.bind(this)
  }

  handleCreateAccount(e) {
    e.preventDefault()
    this.props.resetAPIRequestState()
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    this.props.submitCreateAccount(credentials)
  }

  delayedRedirectToBrowse() {
    setTimeout(() => this.props.history.push("/browse"), 3000)
  }

  render() {
    let content

    if (this.props.loggedIn) {
      content = (
        <div>
          <div className="large-text">You're logged in and being redirected to the browsing page!</ div>
          <Loader />
          {this.delayedRedirectToBrowse()}
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
    resetAPIRequestState: () => dispatch(resetAPIRequestState()),
    submitCreateAccount: (credentials) => dispatch(submitCreateAccount(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateAccountContainer))
