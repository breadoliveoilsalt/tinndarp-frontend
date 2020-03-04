import React from 'react'
import Header from './Header'
import BrowsingContainer from '../features/browsing/BrowsingContainer'
import Footer from './Footer'
import './App.css'

const App = () => {
  return (
    <div className="app">
      <Header />
      <BrowsingContainer />
      <Footer />
    </div>
  )
}

export default App
