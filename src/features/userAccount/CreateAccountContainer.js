import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    let errors = null
    if (this.props.errors) {
      errors = <div>Sorry, the follwoing errors occured:</div>
      const errorDivs = this.props.errors.map(error => {
        return (<div className="error"> error </div>)
      })
      errors += errorDivs
    }

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
    errors: state.userAccount.errors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountContainer)
