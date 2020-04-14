import React, { Component } from 'react'
import { connect } from 'react-redux'
import BrowseLink from '../features/browsing/BrowseLink'
import LogInSignUpLinks from '../features/userAccount/LogInSignUpLinks'
import { tokenPresent } from '../features/userAccount/userAccountSlice'
import { deleteErrors } from '../features/apiRequests/apiRequestsSlice'
import Logo from './Logo'

class Home extends Component {

  componentDidMount() {
    this.props.deleteErrors() 
  }

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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteErrors: () => dispatch(deleteErrors())
  }
}

export default connect(null, mapDispatchToProps)(Home)
