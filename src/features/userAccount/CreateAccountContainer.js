import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AccountForm from './AccountForm'
import ErrorsDisplay from '../apiRequests/ErrorsDisplay'
import RedirectComponent from './RedirectComponent'
import Loader from '../apiRequests/Loader'
import { resetAPIRequestState } from '../apiRequests/apiRequestSlice'
import { signUpAction, loggedInWithToken } from './userAccountSlice'

import './UserAccount.css'

export class CreateAccountContainer extends Component {

  constructor(props) {
    super(props)
    this.handleCreateAccount = this.handleCreateAccount.bind(this)
  }

  componentDidMount() {
    this.props.resetAPIRequestState()
  }

  handleCreateAccount(e) {
    e.preventDefault()
    this.props.resetAPIRequestState()
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    this.props.signUpAction(credentials)
  }

  render() {
    let content

    if (this.props.fetching) {
      content = (<Loader />)
    } else if (this.props.loggedIn || loggedInWithToken()) {
      content = (
        <RedirectComponent
          text="You're logged in and being redirected to the browsing page!"
          redirectTo="/browse"
          millisecondsToRedirect="2500"
        />
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
    fetching: state.apiRequest.fetching,
    errors: state.apiRequest.errors,
    loggedIn: state.userAccount.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetAPIRequestState: () => dispatch(resetAPIRequestState()),
    signUpAction: (credentials) => dispatch(signUpAction(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateAccountContainer))
