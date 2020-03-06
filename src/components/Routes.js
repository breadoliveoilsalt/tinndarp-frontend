import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Home from './Home'
import CreateAccountContainer from '../features/userAccount/CreateAccountContainer'
import BrowsingContainer from '../features/browsing/BrowsingContainer'
import NoMatch from './NoMatch'

const Routes = () => {
  return (
    <BrowserRouter>

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

    </ BrowserRouter>

  )
}

export default Routes
