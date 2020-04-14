import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component {

  render() {
    return (
      <div className="nav-bar-container">
        <Link className="nav-bar-link" to="/browse">Browse</Link>
        <Link className="nav-bar-link" to="/compare">Compare</Link>
      </div>
    )
  }


}

export default NavBar