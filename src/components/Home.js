import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { loggedInWithToken } from '../features/userAccount/userAccountSlice'
import Logo from './Logo'

class Home extends Component {

  render() {

    let content

    if (loggedInWithToken()) {
      content = (
        <div>
          <div className="large-text">Nice to see you again! Click below to browse items</div>
          <button className="action-button logo-style-button" onClick={() => this.props.history.push("/browse")}>Browse</button>
        </div>
      )
    } else {
      content = (
       <div>
         <div className="large-text">Please log in or sign up.</div>
         <button className="action-button logo-style-button" onClick={() => this.props.history.push("/log_in")}>Log In</button>
         <button className="action-button logo-style-button" onClick={() => this.props.history.push("/sign_up")}>Sign Up</button>
      </div>
      )
    }

    return (
      <div>
        <div className="large-text">Welcome to</div>
          <Logo className="home-logo"/>
          {content}
      </div>
    )
  }

}

export default withRouter(Home)
