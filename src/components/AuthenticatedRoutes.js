import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import BrowsingContainer from '../features/browsing/BrowsingContainer'

class AuthenticatedRoutes extends Component {

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

export default AuthenticatedRoutes
