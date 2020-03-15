import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class BrowseLink extends Component {

  render(){
    return(
      <div>
        <div className="large-text">Nice to see you again! Click below to browse items</div>
        <button className="action-button logo-style-button" onClick={() => this.props.history.push("/browse")}>Browse</button>
      </div>

   )
  }

}

export default withRouter(BrowseLink)
