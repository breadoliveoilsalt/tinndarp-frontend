import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Authenticator from '../features/userAccount/Authenticator'
import BrowsingContainer from '../features/browsing/BrowsingContainer'
import Home from './Home'
import SignUpContainer from '../features/userAccount/SignUpContainer'
import LogInContainer from '../features/userAccount/LogInContainer'
import NoMatch from './NoMatch'

class RoutesContainer extends Component {

  render() {
    return (
      <Switch>

        <Route exact path="/browse">
          <Authenticator>
            <BrowsingContainer />
          </Authenticator>
        </Route>

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/sign_up">
          <SignUpContainer />
        </Route>

        <Route exact path="/log_in">
          <LogInContainer />
        </Route>

        <Route path="*">
          <NoMatch />
        </Route>

     </Switch>
    )
  }

}

export default RoutesContainer
