import React from 'react'
import Header from './Header'
import BrowsingContainer from '../features/browsing/BrowsingContainer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <BrowsingContainer />
    </div>
  )
}

export default App
