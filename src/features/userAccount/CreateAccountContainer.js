import React, { Component } from 'react'
import { connect } from 'react-redux'
import AccountForm from './AccountForm'
import ErrorsDisplay from '../apiRequests/ErrorsDisplay'
import './UserAccount.css'

export class CreateAccountContainer extends Component {

  constructor(props) {
    super(props)
    this.handleCreateAccount = this.handleCreateAccount.bind(this)
  }

  handleCreateAccount(e) {
    e.preventDefault()
    console.log("Account Created!")
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountContainer)
