import React from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import Header from "./Header.js"
import BrowsingContainer from "../features/browsing/BrowsingContainer.js"
import "./App.css"
import { fetchItems } from "./itemsReducer"

function App() {
  const dispatch = useDispatch()

  dispatch(fetchItems())
  return (
    <div className="app">
      <Header />
      <BrowsingContainer />
    </div>
  )
}

export default App
