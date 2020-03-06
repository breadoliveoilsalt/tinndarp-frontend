import React from 'react'
import Header from './Header'
import RoutesContainer from './RoutesContainer'
import Footer from './Footer'
import './App.css'

const App = () => {
  return (
    <div className="app">
      <Header />
      <RoutesContainer />
      <Footer />
    </div>
  )
}

export default App
