import React from 'react'
import Header from './Header'
import BrowsingContainer from '../features/browsing/BrowsingContainer'
import './App.css'

const App = () => {
  return (
    <div className="app">
      <Header />
      <BrowsingContainer />
      <div className="footer-to-come" style={{"height": "2em"}}></div>
    </div>
  )
}

export default App
