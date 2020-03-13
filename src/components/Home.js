import React, { Component } from 'react'
import { loggedInWithToken } from '../features/userAccount/userAccountSlice'
import LogInSignUpLinks from '../features/userAccount/LogInSignUpLinks'
import BrowseLink from '../features/browsing/BrowseLink'
import Logo from './Logo'

class Home extends Component {

  render() {

    let content

    if (loggedInWithToken()) {
      content = (
        <div>
          <BrowseLink />
        </div>
      )
    } else {
      content = (
       <LogInSignUpLinks />
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

export default Home
