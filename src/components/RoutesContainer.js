import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import SignUpContainer from '../features/userAccount/SignUpContainer'
import LogInContainer from '../features/userAccount/LogInContainer'
import BrowsingContainer from '../features/browsing/BrowsingContainer'
import NoMatch from './NoMatch'

const RoutesContainer = () => {

  return (
      <Switch>

        <Route exact path="/">
          <Home />
        </ Route>

        <Route exact path="/sign_up">
          <SignUpContainer />
        </Route>

        <Route exact path="/log_in">
          <LogInContainer />
        </Route>

        <Route exact path="/browse">
          <BrowsingContainer />
        </Route>

        <Route path="*">
          <NoMatch />
        </Route>

      </Switch>
  )
}

export default RoutesContainer
