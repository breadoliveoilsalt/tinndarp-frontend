import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import BrowsingContainer from '../features/browsing/BrowsingContainer'
import { authenticateUserToken } from '../features/userAccount/userAccountSlice'

class AuthenticatedRoutes extends Component {

  componentDidMount() {
    this.props.authenticateUserToken()
    // axios.get({
    //   method: "get",
    //   url: "https://tinndarp-backend.herokuapp.com/api/authenticate_user_token",
    //   data: {user: {token: userAccountActions.getToken()} }
    // })
  }

  render() {
    return (
      <Switch>
        <Route exact path="/browse">
          <BrowsingContainer />
        </Route>
      </Switch>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUserToken: () => dispatch(authenticateUserToken())
  }
}

export default connect(null, mapDispatchToProps)(AuthenticatedRoutes)
