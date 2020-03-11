import React, { Component } from 'react'
import Loader from '../apiRequests/Loader'
import { withRouter } from 'react-router-dom'

class RedirectComponent extends Component {

  delayedRedirect() {
    const redirectTo = this.props.redirectTo
    const millisecondsToRedirect = parseInt(this.props.millisecondsToRedirect)
    setTimeout(() => this.props.history.push(redirectTo), millisecondsToRedirect)
  }

  render() {
    return (
      <div>
        <p className="large-text">{this.props.text}</p>
        <Loader />
        {this.delayedRedirect()}
      </div>
    )
  }

}

export default withRouter(RedirectComponent)
