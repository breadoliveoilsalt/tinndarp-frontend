import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AccountForm from './AccountForm'
import ErrorsDisplay from '../apiRequests/ErrorsDisplay'
import RedirectComponent from './RedirectComponent'
import Loader from '../apiRequests/Loader'
import { deleteErrors } from '../apiRequests/apiRequestSlice'
import { logInAction, loggedInWithToken } from './userAccountSlice'
import './UserAccount.css'

export class LogInContainer extends Component {

  constructor(props) {
    super(props)
    this.handleLogIn = this.handleLogIn.bind(this)
  }

  componentDidMount() {
    this.props.deleteErrors()
  }

  handleLogIn(e) {
    e.preventDefault()
    this.props.deleteErrors()
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    this.props.logInAction(credentials)
  }

  render() {
    let content

    if (this.props.fetching) {
      content = (<Loader />)
    } else if (loggedInWithToken()) {
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
            <div className="large-text">Log In</ div>
            {this.props.errors ? <ErrorsDisplay /> : null}
            <AccountForm action={this.handleLogIn} />
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteErrors: () => dispatch(deleteErrors()),
    logInAction: (credentials) => dispatch(logInAction(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogInContainer))
