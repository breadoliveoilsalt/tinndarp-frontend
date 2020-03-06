import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import CreateAccountContainer from '../features/userAccount/CreateAccountContainer'
import BrowsingContainer from '../features/browsing/BrowsingContainer'
import Footer from './Footer'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
          <Switch>

            <Route path="/sign_up">
              <CreateAccountContainer />
            </ Route>

            <Route path="/browse">
              <BrowsingContainer />
            </ Route>

            <Route path="/">
              <Home />
            </ Route>

          </ Switch>
        <Footer />
      </div>
    </ BrowserRouter>
  )
}

export default App
