import React, { Component } from 'react'
import Loader from '../apiRequests/Loader'
import { withRouter } from 'react-router-dom'


class RedirectComponent extends Component {
  constructor(props) {
    super(props)
  }

  delayedRedirect() {
    const redirectPath = this.props.redirectTo
    const millisecondsToRedirect = this.props.millisecondsToRedirect
    setTimeout(() => this.props.history.push(redirectPath), millisecondsToRedirect)
  }


  render() {
    return (
      <div>
        <p>{this.props.text}</p>

        <Loader />
      </div>
    )
  }

}
export default withRouter(RedirectComponent)
