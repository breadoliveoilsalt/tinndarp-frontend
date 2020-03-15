import React, { Component } from 'react'
import { tokenPresent } from '../features/userAccount/userAccountSlice'
import LogInSignUpLinks from '../features/userAccount/LogInSignUpLinks'
import BrowseLink from '../features/browsing/BrowseLink'
import Logo from './Logo'

class Home extends Component {

  render() {

    let content

    if (tokenPresent()) {
      content = (
        <BrowseLink />
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
