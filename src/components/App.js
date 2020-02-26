import React from "react"
import Header from "./Header.js"
import BrowsingContainer from "../features/browsing/BrowsingContainer.js"
import "./App.css"

function App() {
  return (
    <div className="app">
      <Header />
      <BrowsingContainer />
    </div>
  )
}

export default App
