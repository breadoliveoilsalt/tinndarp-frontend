import React, { Component } from 'react'
import { connect } from 'react-redux'
import AccountForm from './AccountForm'
import ErrorsDisplay from '../apiRequests/ErrorsDisplay'
import { submitCreateAccount } from './userAccountSlice'
import './UserAccount.css'

export class CreateAccountContainer extends Component {

  constructor(props) {
    super(props)
    this.handleCreateAccount = this.handleCreateAccount.bind(this)
  }

// TEST! 
  handleCreateAccount(e) {
    e.preventDefault()
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    this.props.submitCreateAccount(credentials)
  }

  render() {
    let errors = this.props.errors ? <ErrorsDisplay /> : null

    return (
      <div>
        <div className="large-text">Sign Up for an Account! </ div>
        {errors}
        <AccountForm action={this.handleCreateAccount} />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    errors: state.apiRequest.errors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitCreateAccount: (credentials) => dispatch(submitCreateAccount(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountContainer)
