import React, { Component } from 'react'
import AccountForm from './AccountForm'
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
    return (
      <div>
        <div className="large-text">Sign Up for an Account! </ div>
        <AccountForm action={this.handleCreateAccount} />
      </div>
    )
  }

}

export default CreateAccountContainer
