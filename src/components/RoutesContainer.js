import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Home'
import CreateAccountContainer from '../features/userAccount/CreateAccountContainer'
import BrowsingContainer from '../features/browsing/BrowsingContainer'
import NoMatch from './NoMatch'

const RoutesContainer = () => {

  return (
      <Switch>

        <Route exact path="/">
          <Home />
        </ Route>

        <Route exact path="/sign_up">
          <CreateAccountContainer />
        </ Route>

        <Route exact path="/browse">
          <BrowsingContainer />
        </ Route>

        <Route path="*">
          <NoMatch />
        </ Route>

      </ Switch>
  )
}

export default RoutesContainer
